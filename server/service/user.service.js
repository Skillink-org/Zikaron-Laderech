"use server"
import User from '@/server/models/user.model';
import PasswordReset from '@/server/models/passwordReset.model';
import { connectToDB } from '../connect';
import crypto from "crypto";
import { transporter } from '@/lib/email'

export async function getUserByEmail(email) {
    await connectToDB();
    const user = await User.findOne({ email });
    return user;
}

export async function createUser(user) {
    await connectToDB();
    const newUser = new User(user);
    await newUser.save();
    return newUser;
};

export async function generateResetToken(userId) {
    await connectToDB();
    const token = crypto.randomBytes(32).toString("hex");
    const expiration = new Date(Date.now() + 10 * 60 * 1000);

    await PasswordReset.deleteMany({ userId });
    await PasswordReset.create({ userId, token, expiresAt: expiration });

    return token;
}

export async function sendLinkToEmail(link, email) {
    const mailOptions = {
        from: process.env.GMAIL_ADDRESS,
        to: email,
        subject: "איפוס סיסמא- עבור כניסה לזיכרון לדרך",
        html: `
        <div dir="rtl" style="text-align: right; font-family: Arial, sans-serif;">
            <p>שלום,</p>
            <p>לחץ על הקישור הבא כדי לאפס את הסיסמה שלך:</p>
            <p><a href="${link}" target="_blank">${link}</a></p>
            <p>אם לא ביקשת לאפס את הסיסמה, ניתן להתעלם מההודעה.</p>
        </div>
    `
    };

    await transporter.sendMail(mailOptions);
}


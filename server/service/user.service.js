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

export async function sendTokenToEmail(token, email) {
    const mailOptions = {
        from: process.env.GMAIL_ADDRESS,
        to: email,
        subject: "איפוס סיסמא- עבור כניסה לזיכרון לדרך",
        text: `אפס את סיסמתך בקישור הבא ${token}`
    };

    await transporter.sendMail(mailOptions);
}


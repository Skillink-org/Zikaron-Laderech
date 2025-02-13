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
}

export async function sendWelcomeEmail(email, name, link) {
    const mailOptions = {
        from: process.env.GMAIL_ADDRESS,
        to: email,
        subject: "נרשמת בהצלחה!",
        html: `
        <div dir="rtl" style="text-align: center; color: #3f484c;">
            <p>שלום ${name},</p>
            <p>נרשמת בהצלחה לאתר "זיכרון לדרך"</p>
            <p>אנחנו מזמינים אותך לבקר באתר שלנו</p>
            <p><a href="${link}" target="_blank">${link}</a></p>
            <p>בברכה, צוות זיכרון לדרך</p>
        </div>`
    };
    await transporter.sendMail(mailOptions);
}

export async function generateResetToken(userId) {
    try {
        await connectToDB();
        const token = crypto.randomBytes(32).toString("hex");
        const expiration = new Date(Date.now() + 10 * 60 * 1000);
        console.log("User ID:", userId);
        await PasswordReset.deleteMany({ userId });
        const reset = await PasswordReset.create({ userId, token, expiresAt: expiration });
        console.log("Token created in database:", reset);
        return token;
    } catch (error) {
        console.error("Error in generateResetToken:", error);
    }
}

export async function sendLinkToEmail(link, email) {
    const mailOptions = {
        from: process.env.GMAIL_ADDRESS,
        to: email,
        subject: "איפוס סיסמא- עבור כניסה לזיכרון לדרך",
        html: `
        <div dir="rtl" style="text-align: center; color: #3f484c;">
            <p>שלום,</p>
            <p>לחץ על הקישור הבא כדי לאפס את הסיסמה שלך:</p>
            <p><a href="${link}" target="_blank">${link}</a></p>
            <p>הקישור תקף ל-10 דקות בלבד.</p>
            <p>אם לא ביקשת לאפס את הסיסמה, ניתן להתעלם מההודעה.</p>
            <p>בברכה, צוות זיכרון לדרך</p>
        </div>`
    };
    await transporter.sendMail(mailOptions);
}

export async function isTokenValid(token) {
    try {
        await connectToDB();
        const tokenEntry = await PasswordReset.findOne({ token }).lean();
        if (!tokenEntry) {
            return { isValid: false };
        }
        if (new Date() > tokenEntry.expiresAt) {
            await PasswordReset.deleteOne({ token });
            return { isValid: true, userId: tokenEntry.userId };
        }
        return { isValid: true, userId: tokenEntry.userId.toString() };
    } catch (error) {
        console.error("Error in isTokenValid:", error.message);
        return false;
    }
}


export async function updateUserPassword(userId, newPassword) {
    await connectToDB();
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { password: newPassword },
        { new: true }
    ).lean();
    if (updatedUser && updatedUser._id) {
        updatedUser._id = updatedUser._id.toString();
    }
    return updatedUser;
}



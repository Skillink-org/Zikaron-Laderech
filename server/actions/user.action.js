'use server'
import { getBaseUrl } from '@/lib/baseUrl';
import * as service from '../service/user.service';

export async function createUserAction(user) {
    const newUser = await service.createUser(user);
    const plainUser = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
    };
    const baseUrl = getBaseUrl();
    await service.sendWelcomeEmail(newUser.email, `${newUser.firstName}`, baseUrl);
    return { newUser: plainUser };
};

export async function resetPasswordAction(email) {
    try {
        const user = await service.getUserByEmail(email);
        const plainUser = {
            email: user.email,
            id: user._id
        };
        const token = await service.generateResetToken(plainUser.id);
        if (!token) {
            throw new Error("Failed to generate reset token");
        }
        const baseUrl = getBaseUrl();
        const resetLink = `${baseUrl}/reset-password/${token}`;
        await service.sendLinkToEmail(resetLink, email);
    } catch (error) {
        console.error("Error in resetPasswordAction:", error.message);
    }
}


export async function isValidTokenAction(token) {
    const response = await service.isTokenValid(token);
    console.log("isValid in action: " + response)
    return response;
}

export async function updateUserPasswordAction(userId, newPassword) {
    const updateUser = await service.updateUserPassword(userId, newPassword);
    return updateUser;
}
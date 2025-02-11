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

    return { newUser: plainUser };
};

export async function resetPasswordAction(email) {
    const user = await service.getUserByEmail(email);
    const plainUser = {
        email: user.email,
        id: user._id
    };
    const token = await service.generateResetToken(plainUser.id);
    const baseUrl = getBaseUrl();
    const resetLink = `${baseUrl}/reset-password/${token}`;
    await service.sendLinkToEmail(resetLink, email);
};
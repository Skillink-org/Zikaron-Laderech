'use server'
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
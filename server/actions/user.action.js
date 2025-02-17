'use server'
import * as service from "@/server/service/user.service.js";

export async function createUserAction(user) {
    const newUser = await service.createUser(user);

    const plainUser = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
    };

    return { newUser: plainUser };
};

export async function getAllUsers() {
  return await service.getAllUsers();
}

export async function changRole(id) {
    return await service.changRole(id);
}
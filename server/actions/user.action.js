import bcrypt from 'bcryptjs';
import * as service from '@/server/service/user.service';
import { signIn } from "next-auth/react";

export async function signUp(user) {
    if (user.password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
    }
    const newUser = service.createUser(user);
    return newUser;
}

export async function signInByGoogle() {
    signIn("google");
}

export async function signInByEmail(user) {
    const response = await signIn("credentials", {
        redirect: false,
        email: user.email,
        password: user.password,
    });
    return response;
}
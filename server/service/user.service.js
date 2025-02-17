import User from '@/server/models/user.model';
import { connectToDB } from '../connect';
import { serializer } from "@/lib/serializer";

export async function getAllUsers() {
    return serializer(await User.find({}, { password: 0 }));
}

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

export async function changRole(id) {
    try {
        const user = await User.findById(id);
        if (!user) throw new Error("User not found");

        const newRole = user.role === "admin" ? "user" : "admin";

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { role: newRole },
            { new: true }
        );

        return updatedUser;
    } catch (error) {
        console.error("Error in changeRole:", error);
        throw error;
    }
}
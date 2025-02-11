import User from '@/server/models/user.model';
import { connectToDB } from '../connect';

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
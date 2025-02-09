import User from '@/server/models/user.model';

export async function getUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
}

export async function createUser(user) {
    const newUser = new User(user);
    await newUser.save();
    return newUser;
};
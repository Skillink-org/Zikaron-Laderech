import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;

import mongoose from 'mongoose';

const fallenSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    deathDate: { type: Date, required: true },
    hobbies: [{
        name: { type: String, required: true },
        continueCount: { type: Number, default: 0 }
    }],
    about: { type: String },
    familyWords: { type: String },
    imageUrl: { type: String },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending"},
});

const Fallen = mongoose.models.Fallen || mongoose.model('Fallen', fallenSchema);
export default Fallen;

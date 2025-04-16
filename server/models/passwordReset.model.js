import mongoose from "mongoose";

const PasswordResetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
});

const PasswordReset = mongoose.models.PasswordReset || mongoose.model("PasswordReset", PasswordResetSchema);
export default PasswordReset;

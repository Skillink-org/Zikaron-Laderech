import mongoose from 'mongoose';

export const connectToMongo = async () => {
  try {
    if (mongoose.connection.readyState === 1) return;
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB (Mongoose)");
  } catch (error) {
    console.log("Connection error:", error);
  }
} 
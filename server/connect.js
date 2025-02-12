import mongoose from 'mongoose';

/**
 * Connect app to MongoDB database using Mongoose
 * @returns {Promise<void>}
 */
export const connectToDB = async () => {
  try {
    // If already connected, return
    if (mongoose.connection.readyState === 1) return;

    // Construct the database link
    let url = process.env.DB_LINK;

    // Connect to the database
    console.log({ status: 'info', message: `Connecting to MongoDB at ${url}` });
    await mongoose.connect(url);

    // Log the connection details
    console.log(
      `Successfully connected to MongoDB at ${mongoose.connection.host}:${mongoose.connection.port}`
    );
  } catch (err) {
    // Handle connection errors
    console.log({ status: 'error', message: err.message });
  }
};
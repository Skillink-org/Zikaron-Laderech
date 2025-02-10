// Imports
import mongoose from 'mongoose';

/**
 * Connet app to MongoDB database using Mongoose
 * @returns {Promise<void>}
 */
export const connectToDB = async () => {
  try {
    // If already connected, return
    if (mongoose.connection.readyState === 1) return;

    // Construct the database link
    let url = process.env.DB_LINK;
    // url = url
      // .replace('<DB_PASS>', process.env.DB_PASS)
      // .replace('<DB_USER>', process.env.DB_USER);

    // Connect to the database
    console.log({ status: 'info', message: `Connecting to MongoDB at ${url}` });
    await mongoose.connect(url);

    // Log the connection details
    console.log(
      `Successfully connected to MongoDB at ${mongoose.connection.host}:${mongoose.connection.port}`
    );

    // Handle connection errors
  } catch (err) {
    console.log({ status: 'error', message: err.message });
  }
};

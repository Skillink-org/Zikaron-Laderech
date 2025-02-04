'use server'
import { v2 as cloudinary } from "cloudinary";
// Configuration setup - runs once when the file is loaded
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
});

export async function uploadImage(formData) {
    // Retrieve the file from FormData
    const file = formData.get("image");
    
    if (!file) {
        throw new Error("No file selected");
    }

    try {
        // Convert the file to a buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload the image to Cloudinary
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { 
                    folder: "fallen_images",    // Save in a dedicated folder
                    resource_type: "auto",      // Automatically detect file type
                    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // Restrict file types
                    max_file_size: 5000000      // Limit file size (5MB)
                }, 
                (error, result) => {
                    if (error) {
                        console.error('Error uploading image:', error);
                        reject(new Error('Error uploading image'));
                    } else {
                        resolve(result.secure_url);
                    }
                }
            ).end(buffer);
        });
    } catch (error) {
        console.error('Error processing file:', error);
        throw new Error('Error processing file');
    }
}
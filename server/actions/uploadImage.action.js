"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
});

export async function uploadImage(formData) {

    "use server";
    const file = formData.get("image");

    if (!file) {
        throw new Error("No file uploaded");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "fallen_images" }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.secure_url); // מחזיר את ה-URL של התמונה
            }
        }).end(buffer);
    });
}

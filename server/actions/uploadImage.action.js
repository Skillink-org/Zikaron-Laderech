'use server'

import { v2 as cloudinary } from "cloudinary";

// הגדרת הקונפיגורציה - תרוץ פעם אחת כשהקובץ נטען
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
});

export async function uploadImage(formData) {
    // קבלת הקובץ מה-FormData
    const file = formData.get("image");
    
    if (!file) {
        throw new Error("לא נבחר קובץ");
    }

    try {
        // המרת הקובץ ל-buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // העלאת התמונה ל-Cloudinary
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { 
                    folder: "fallen_images",    // שמירה בתיקייה ייעודית
                    resource_type: "auto",      // זיהוי אוטומטי של סוג הקובץ
                    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // הגבלת סוגי קבצים
                    max_file_size: 5000000      // הגבלת גודל קובץ (5MB)
                }, 
                (error, result) => {
                    if (error) {
                        console.error('שגיאה בהעלאת התמונה:', error);
                        reject(new Error('שגיאה בהעלאת התמונה'));
                    } else {
                        resolve(result.secure_url);
                    }
                }
            ).end(buffer);
        });
    } catch (error) {
        console.error('שגיאה בעיבוד הקובץ:', error);
        throw new Error('שגיאה בעיבוד הקובץ');
    }
}
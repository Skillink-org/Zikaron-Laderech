import { NextResponse } from 'next/server';
import { updateFallenById } from '@/server/actions/fallen.action';
import { uploadImage } from '@/server/actions/uploadImage.action';
import { connectToDB } from '@/server/connect';

export async function POST(request) {
    try {
        await connectToDB();

        const formData = await request.formData();

        const jsonString = formData.get('data');
        if (!jsonString) {
            throw new Error("Missing data payload.");
        }

        const data = JSON.parse(jsonString);

        const file = formData.get('image');
        if (file) {
            const imageFormData = new FormData();
            imageFormData.append("image", file);

            const imageUrl = await uploadImage(imageFormData);
            
            // const imageUrl = await uploadImage(file);
            data.imageUrl = imageUrl;
        }

        const fallen = await updateFallenById(data);

        return NextResponse.json({
            success: true,
            data: fallen
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Error updating data'
            },
            { status: 500 }
        );
    }
}

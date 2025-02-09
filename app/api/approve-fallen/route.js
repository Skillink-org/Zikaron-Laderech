import { NextResponse } from 'next/server';
import { approveFallen } from '@/server/actions/fallen.action';
import { connectToDB } from '@/server/connect';

export async function POST(request) {
    try {
        await connectToDB();

        const { id } = await request.json();
        const fallen = await approveFallen(id);

        return NextResponse.json({
            success: true,
            data: fallen
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Error approving fallen'
            },
            { status: 500 }
        );
    }
}
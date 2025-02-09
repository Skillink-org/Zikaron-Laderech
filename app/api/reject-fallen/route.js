import { NextResponse } from 'next/server';
import { rejectFallen } from '@/server/actions/fallen.action';
import { connectToDB } from '@/server/connect';

export async function POST(request) {
    try {
        await connectToDB();

        const { id, note } = await request.json();
        const fallen = await rejectFallen(id, note);

        return NextResponse.json({
            success: true,
            data: fallen
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Error rejecting fallen'
            },
            { status: 500 }
        );
    }
}
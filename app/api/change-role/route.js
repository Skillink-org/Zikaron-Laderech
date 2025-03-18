import { NextResponse } from 'next/server';
import { changRole } from '@/server/actions/user.action';
import { connectToDB } from '@/server/connect';

export async function POST(request) {
    try {
        await connectToDB();

        const { id } = await request.json();
        const user = await changRole(id);

        return NextResponse.json({
            success: true,
            data: user
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Error updating user role'
            },
            { status: 500 }
        );
    }
}
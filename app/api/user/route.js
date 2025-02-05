import { NextResponse } from 'next/server';
import * as userService from '@/server/service/user.service';
import { connectToDB } from '@/server/connect';

export async function POST(request) {
    try {
        await connectToDB();
        const data = await request.json();
        const newUser = await userService.createUser(data);

        return NextResponse.json({
            success: true,
            data: newUser
        });

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Error saving data'
            },
            { status: 500 }
        );
    }
}
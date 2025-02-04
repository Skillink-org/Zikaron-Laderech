import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import * as userService from '@/server/service/user.service';
import { connectToDB } from '@/server/connect';

export async function POST(request) {
    try {
        await connectToDB();
        const data = await request.json();

        if (data.password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            data.password = hashedPassword;
        }
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

export async function GET(request) {
    try {
        await connectToDB();
        const { email } = request.nextUrl.searchParams;

        if (!email) {
            return NextResponse.json({
                success: false,
                error: 'Email is required',
            }, { status: 400 });
        }

        const user = await userService.getUserByEmail(email);

        if (!user) {
            return NextResponse.json({
                success: false,
                error: 'User not found',
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: user,
        });

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Error fetching user data'
            },
            { status: 500 }
        );
    }
}

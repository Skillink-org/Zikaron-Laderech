import { NextResponse } from 'next/server';
import { addFallen } from '@/server/service/fallen.service';
import { connectToDB } from '@/server/connect';
import { sendAdminNotification } from '@/lib/email';

export async function POST(request) {
  try {
    await connectToDB();
    
    const data = await request.json();
    const fallen = await addFallen(data);
    
    //Send an email notification to the admin
    try {
      await sendAdminNotification(data);
    } catch (emailError) {
      console.error('Error sending admin notification:', emailError);
      //Continue even if there is an email error
    }

    return NextResponse.json({ 
      success: true, 
      data: fallen 
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Error saving data'
      },
      { status: 500 }
    );
  }
}
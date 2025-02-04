import { NextResponse } from 'next/server';
import { addFallen } from '@/server/service/fallen.service';
import { connectToDB } from '@/server/connect';

export async function POST(request) {
  try {
    await connectToDB();
    
    const data = await request.json();
    const fallen = await addFallen(data);

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
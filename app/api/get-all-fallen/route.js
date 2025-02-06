import { NextResponse } from 'next/server';
import { getAllFallen } from '@/server/actions/fallen.action';  
import { connectToDB } from '@/server/connect';

export async function GET() {
  try {
    await connectToDB();
    
    const fallen = await getAllFallen();

    return NextResponse.json({ 
      success: true, 
      data: fallen 
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Error fetching data'
      },
      { status: 500 }
    );
  }
}
// import { NextResponse } from 'next/server';
// import { fallenService } from '@/server/service/fallen.service';
// import { connectToDB } from '@/server/connect';

// export async function POST(request) {
//   try {
//     await connectToDB();
    
//     const data = await request.json();
//     const fallen = await fallenService.create(data);

//     return NextResponse.json({ 
//       success: true, 
//       data: fallen 
//     });

//   } catch (error) {
//     console.error('API Error:', error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         error: 'שגיאה בשמירת הנתונים' 
//       },
//       { status: 500 }
//     );
//   }
// }
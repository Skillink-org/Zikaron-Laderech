// /server/actions/addFallen.action.js
"use server";

import { revalidatePath } from "next/cache";

/**
 * Server Action להוספת נופל חדש למערכת
 */
export async function addFallen(fallenData) {
  try {
    // שליחת הנתונים לשרת - חייב להשתמש ב-URL מלא בסביבת שרת
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${apiUrl}/api/add-fallen`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fallenData),
      // להוסיף אופציות חשובות לשרת
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `שגיאה בשמירת הנתונים: ${response.status}`);
    }

    const result = await response.json();

    // לאחר שמירה מוצלחת, מרעננים את הנתיבים הרלוונטיים
    revalidatePath('/');
    revalidatePath('/fallen');
    
    return { success: true, data: result.data || result };
  } catch (error) {
    console.error("שגיאה בהוספת נופל:", error);
    return { 
      success: false, 
      error: error.message || "אירעה שגיאה. נא לנסות שוב." 
    };
  }
}
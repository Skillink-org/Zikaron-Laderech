// /server/actions/addFallen.action.js
"use server";

import { revalidatePath } from "next/cache";

/**
 * Server Action להוספת נופל חדש למערכת
 */
export async function addFallen(fallenData) {
  try {
    // Send data to server - must use full URL in server environment
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${apiUrl}/api/add-fallen`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fallenData),
      // Add important server options
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `שגיאה בשמירת הנתונים: ${response.status}`);
    }

    const result = await response.json();

    // After successful save, refresh relevant paths
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
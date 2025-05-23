import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export async function sendAdminNotification(fallenData) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_ADDRESS;
  
  const mailOptions = {
    from: process.env.GMAIL_ADDRESS,
    to: adminEmail,
    subject: "נופל חדש ממתין לאישור",
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif;">
        <h2>נופל חדש ממתין לאישור</h2>
        <p><strong>שם:</strong> ${fallenData.firstName} ${fallenData.lastName}</p>
        <p><strong>תאריך לידה:</strong> ${new Date(fallenData.birthDate).toLocaleDateString('he-IL')}</p>
        <p><strong>תאריך פטירה:</strong> ${new Date(fallenData.deathDate).toLocaleDateString('he-IL')}</p>
        <p><strong>תחביבים:</strong> ${fallenData.hobbies.map(h => h.name).join(', ')}</p>
        <p><strong>אימייל ליצירת קשר:</strong> ${fallenData.email}</p>
        <p><strong>טלפון:</strong> ${fallenData.phone || 'לא צוין'}</p>
        <hr>
        <p>לאישור או דחיית הבקשה, אנא היכנס למערכת הניהול.</p>
      </div>
    `
  };

  return await transporter.sendMail(mailOptions);
}

export async function sendApprovalNotification(fallenData, slug) {
  if (!fallenData.email) {
    throw new Error("No email found for this record");
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const mailOptions = {
    from: process.env.GMAIL_ADDRESS,
    to: fallenData.email,
    subject: "הפרופיל אושר",
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif;">
        <h2>הפרופיל של ${fallenData.firstName} ${fallenData.lastName} אושר</h2>
        <p>שלום,</p>
        <p>אנו שמחים להודיע לך שהפרופיל של ${fallenData.firstName} ${fallenData.lastName} אושר ופורסם באתר.</p>
        <p>לצפייה בפרופיל: <a href="${baseUrl}/all-fallen/${slug}">לחץ כאן</a></p>
        <p>תודה שהצטרפת למיזם ההנצחה.</p>
        <hr>
        <p>בברכה,<br>צוות מיזם ההנצחה</p>
      </div>
    `
  };

  return await transporter.sendMail(mailOptions);
}

export async function sendRejectionNotification(fallenData, note) {
  // Check for valid email
  if (!fallenData.email) {
    throw new Error("No email found for this record");
  }
  
  const mailOptions = {
    from: process.env.GMAIL_ADDRESS,
    to: fallenData.email,
    subject: "הפרופיל נדחה",
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif;">
        <h2>הפרופיל של ${fallenData.firstName} ${fallenData.lastName} לא אושר</h2>
        <p>שלום,</p>
        <p>לצערנו, הפרופיל שהוגש לא אושר לפרסום באתר.</p>
        <p><strong>סיבת הדחייה:</strong> ${note || 'לא צוינה סיבה'}</p>
        <p>אם לדעתך חלה טעות או שברצונך לתקן את הפרטים ולהגיש שוב, אנא צור איתנו קשר.</p>
        <hr>
        <p>בברכה,<br>צוות מיזם ההנצחה</p>
      </div>
    `
  };

  return await transporter.sendMail(mailOptions);
}

export async function sendContactFormNotification(contactData) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_ADDRESS;
  
  const mailOptions = {
    from: process.env.GMAIL_ADDRESS,
    to: adminEmail,
    subject: "פנייה חדשה התקבלה באתר",
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif;">
        <h2>התקבלה פנייה חדשה באתר</h2>
        <p><strong>שם:</strong> ${contactData.name}</p>
        <p><strong>אימייל:</strong> ${contactData.email}</p>
        <p><strong>טלפון:</strong> ${contactData.phone}</p>
        <p><strong>נושא:</strong> ${contactData.subject}</p>
        <p><strong>תוכן ההודעה:</strong></p>
        <p>${contactData.message}</p>
        <hr>
        <p>הודעה זו נשלחה באופן אוטומטי ממערכת יצירת הקשר באתר.</p>
      </div>
    `
  };

  return await transporter.sendMail(mailOptions);
}
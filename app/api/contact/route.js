import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { fullName, email, phone, subject, message } = await req.json();

    if (!fullName || !email || !phone || !subject || !message) {
      return new Response(JSON.stringify({ message: "נא למלא את כל השדות" }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER, // כתובת שאליה נשלח המייל
      subject: `פניה חדשה מ-${fullName}: ${subject}`,
      text: `שם מלא: ${fullName}\nאימייל: ${email}\nטלפון: ${phone}\n\n${message}`,
    });

    return new Response(JSON.stringify({ message: "ההודעה נשלחה בהצלחה!" }), { status: 200 });
  } catch (error) {
    console.error("שגיאה בשליחת המייל:", error);
    return new Response(JSON.stringify({ message: "שגיאה בשליחת המייל" }), { status: 500 });
  }
}

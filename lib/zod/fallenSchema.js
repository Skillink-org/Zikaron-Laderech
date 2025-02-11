import { z } from "zod";

export const fallenSchema = z.object({
    fullName: z.string().min(5, "נא להזין שם מלא (שם פרטי ושם משפחה)").regex(/^[a-zA-Zא-ת\s]*$/, "שם יכול להכיל רק אותיות ורווחים"),
    birthYear: z.string().min(4, "נא להזין שנת לידה תקינה").refine(val => {
      const year = parseInt(val, 10);
      return year > 0 && year <= new Date().getFullYear();
    }, "שנת הלידה לא תקינה"),
    deathDate: z.string().min(1, "נא להזין תאריך פטירה"),
    hobbies: z.string().min(1, "נא להזין לפחות תחביב אחד").refine(val => val.split(",").length <= 6, "ניתן להזין עד 6 תחביבים"),
    about: z.string().min(10, "נא להזין מידע על הנופל"),
    familyMessage: z.string().min(5, "נא להזין מסר מהמשפחה"),
    imageFile: z.instanceof(File, "נא להעלות תמונה").optional(),
    highlightQuote: z.string().min(5, "נא להזין ציטוט או משפט חשוב מהנופל"),
  });
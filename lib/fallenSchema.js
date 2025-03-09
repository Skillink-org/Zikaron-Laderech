import { z } from "zod";

export const fallenSchema = z.object({
    firstName: z.string()
        .min(1, "נא להזין שם פרטי")
        .regex(/^[a-zA-Zא-ת\s]*$/, "נא להזין שם פרטי תקני")
        .refine(value => value.trim().length > 0, "נא להזין שם פרטי תקני"),

    lastName: z.string()
        .min(1, "נא להזין שם משפחה")
        .regex(/^[a-zA-Zא-ת\s]*$/, "נא להזין שם משפחה תקני")
        .refine(value => value.trim().length > 0, "נא להזין שם משפחה תקני"),

    birthDate: z.string()
        .min(1, "נא להזין תאריך לידה")
        .refine(value => new Date(value) < new Date(), "נא להזין תאריך לידה תקין"),

    deathDate: z.string()
        .min(1, "נא להזין תאריך פטירה")
        .refine(value => new Date(value) < new Date(), "נא להזין תאריך פטירה תקין")
        .refine(value => new Date(value) >= new Date("2023-10-07"), "תאריך פטירה חייב להיות 07.10.2023 או מאוחר יותר"),

    hobbies: z.string()
        .min(1, "נא להזין לפחות תחביב אחד"),

    about: z.string()
        .min(1, "נא להזין מידע אודות הנופל"),

    familyWords: z.string()
        .min(1, "נא להזין מסר מהמשפחה"),

    quote: z.string()
        .min(1, "נא להזין ציטוט"),

    email: z.string()
        .min(1, "נא להזין כתובת דוא''ל ליצירת קשר")
        .email("נא להזין כתובת דוא''ל תקינה"),

    phone: z.string()
        .optional(),

    image: z.any()
        .optional(),

    imageUrl: z.string()
        .min(1, "נא להעלות תמונה"),

});

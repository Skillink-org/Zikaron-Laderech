import * as service from "@/server/service/fallen.service";
import { z } from "zod";

const fallenSchema = z.object({
    fullName: z.string().min(5).regex(/^[a-zA-Zא-ת\s]*$/, "שם יכול להכיל רק אותיות ורווחים"),
    birthYear: z.string().min(4).refine(val => {
        const year = parseInt(val, 10);
        return year > 0 && year <= new Date().getFullYear();
    }, "שנת הלידה לא תקינה"),
    deathDate: z.string().min(1),
    hobbies: z.string().min(1).refine(val => val.split(",").length <= 6, "ניתן להזין עד 6 תחביבים"),
    about: z.string().min(10),
    familyMessage: z.string().min(5),
    imageFile: z.instanceof(File, "נא להעלות תמונה").optional(),
    highlightQuote: z.string().min(5),
});

export async function addFallen(data) {
    const parsed = fallenSchema.safeParse(data);
    if (!parsed.success) {
        return { success: false, error: parsed.error.errors.map(e => e.message).join("\n") };
    }

    try {
        const newFallen = await service.addFallen(data);
        return { success: true, data: newFallen };
    } catch (error) {
        return { success: false, error: error.message || "שגיאה לא ידועה" };
    }
}

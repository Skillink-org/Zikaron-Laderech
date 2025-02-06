import * as service from "@/server/service/fallen.service";

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

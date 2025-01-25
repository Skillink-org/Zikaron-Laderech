export function dateFormatter(date) {
    return new Date(date).toLocaleDateString("he-IL", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}
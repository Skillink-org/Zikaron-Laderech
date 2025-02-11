export function dateFormatter(date) {
  return new Date(date).toLocaleDateString("he-IL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function extractYearFromLongDate(longDate) {
  const date = new Date(longDate);
  const year = date.getFullYear();
  return year;
}

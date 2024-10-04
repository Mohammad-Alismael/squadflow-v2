export function parseDate(dateString: string) {
  if (dateString === "") return "";
  const [month, day, year] = dateString.split("/");
  return new Date(Number(year), Number(month) - 1, Number(day));
}

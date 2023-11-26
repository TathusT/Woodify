export function convertIsoToThaiDateTime(isoDateString: string): string {
  const isoDate = new Date(isoDateString);

  const thaiYear = isoDate.getFullYear() + 543;
  const thaiMonth = (isoDate.getMonth() + 1).toString().padStart(2, "0");
  const thaiDay = isoDate.getDate().toString().padStart(2, "0");
  const thaiHours = isoDate.getHours().toString().padStart(2, "0");
  const thaiMinutes = isoDate.getMinutes().toString().padStart(2, "0");

  return `${thaiDay}/${thaiMonth}/${
    thaiYear % 100
  } ${thaiHours}.${thaiMinutes} น.`;
}

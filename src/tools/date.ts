export const GetToDay = () => {
  const date = new Date();
  const result = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const splitDate = result.split("/");
  return `${parseInt(splitDate[2]) - 543}-${String("0" + splitDate[1]).slice(-2)}-${String(
    "0" + splitDate[0]
  ).slice(-2)}`;
};



export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

export const addDays = (date: string, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

export const isOverdue = (returnDate: string) => {
  const today = new Date();
  const rDate = new Date(returnDate);

  return rDate < today;
};

export const daysBetween = (start: string, end: string) => {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();

  return Math.ceil((e - s) / (1000 * 60 * 60 * 24));
};
export type BookMovement = {
  bookNo: string;
  action: "added" | "borrowed" | "returned" | "lost" | "replaced";
  studentAdmNo?: string;
  date: string;
};

let history: BookMovement[] = [];

export const logMovement = (data: BookMovement) => {
  history.push(data);
};

export const getBookHistory = (bookNo: string) => {
  return history.filter(h => h.bookNo === bookNo);
};

export const getFullHistory = () => {
  return history;
};
export type Student = {
  admNo: string;
  name: string;
  class: string;
  status: "active" | "suspended" | "blacklisted";
  borrowedBooks: string[];
};

let students: Student[] = [];

export const findStudent = (admNo: string) => {
  return students.find(s => s.admNo === admNo);
};

export const suspendStudent = (
  admNo: string,
  status: Student["status"]
) => {
  const student = students.find(s => s.admNo === admNo);
  if (!student) throw new Error("Student not found");

  student.status = status;
  return student;
};

export const assignBookToStudent = (admNo: string, bookNo: string) => {
  const student = students.find(s => s.admNo === admNo);
  if (!student) throw new Error("Student not found");

  student.borrowedBooks.push(bookNo);
};
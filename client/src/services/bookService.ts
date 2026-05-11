export type Book = {
  bookNo: string;
  name: string;
  type: "textbook" | "story";
  grade?: string;
  subject?: string;
  quantity: number;
  status: "available" | "borrowed" | "lost" | "replaced";
};

let books: Book[] = []; // TEMP (later DB)

export const addBook = (book: Book) => {
  const exists = books.find(b => b.bookNo === book.bookNo);
  if (exists) throw new Error("Book number already exists");

  books.push(book);
  return book;
};

export const getBooks = () => {
  return books;
};

export const findBookByNumber = (bookNo: string) => {
  return books.find(b => b.bookNo === bookNo);
};

export const updateBookStatus = (
  bookNo: string,
  status: Book["status"]
) => {
  const book = books.find(b => b.bookNo === bookNo);
  if (!book) throw new Error("Book not found");

  book.status = status;
  return book;
};
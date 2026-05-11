import { Book } from "../services/bookService";

type FilterOptions = {
  search?: string;
  type?: "textbook" | "story" | "all";
  grade?: string;
  subject?: string;
  sort?: "oldest" | "latest";
};

export const filterBooks = (books: Book[], options: FilterOptions) => {
  let result = [...books];

  // 🔎 Search (by name or bookNo)
  if (options.search) {
    const term = options.search.toLowerCase();
    result = result.filter(
      (b) =>
        b.name.toLowerCase().includes(term) ||
        b.bookNo.toLowerCase().includes(term)
    );
  }

  // 📘 Type filter
  if (options.type && options.type !== "all") {
    result = result.filter((b) => b.type === options.type);
  }

  // 🎓 Grade filter (only for textbooks)
  if (options.grade) {
    result = result.filter((b) => b.grade === options.grade);
  }

  // 📚 Subject filter
  if (options.subject) {
    result = result.filter((b) => b.subject === options.subject);
  }

  // 🕒 Sort
  if (options.sort === "latest") {
    result.reverse();
  }

  return result;
};
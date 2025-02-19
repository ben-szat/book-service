import { books, type Book } from "../../models/bookModel.mts";

const fetchBookById = (id: string) => {
  return books.find((book) => book.id === id);
};

export const resolvers = {
  Query: {
    // Get all books
    books: () => books,
  },
  Book: {
    __resolveReference(book, { fetchBookById }) {
      return fetchBookById(book.id);
    },
  },
};

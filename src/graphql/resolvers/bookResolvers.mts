import {  type CreateBookInput, type Book } from "../../models/bookModel.mts";
import { type Context } from "../../types/types.mts";

export const resolvers = {
  Query: {
    // Get all books
    books: async (_parent: unknown, _args: {}, context: Context) => {
      return await context.db.collection<Book>("books").find().toArray();
    },

    getBookById: async (
      _parent: unknown,
      args: { id: string },
      context: Context
    ) => {
      return await context.db
        .collection<Book>("books")
        .findOne({ id: args.id });
    },

    getBookByTitle: async (
      _parent: unknown,
      args: { title: string },
      context: Context
    ) => {
      return await context.db
        .collection<Book>("books")
        .findOne({ title: args.title });
    },
  },
  Mutation: {
    // Create a new book
    createBook: async (_parent: unknown, newBook: CreateBookInput, context: Context) => {
      try {
      await context.db.collection("books").insertOne(newBook);
      return newBook
    } catch (error) {
      if (error.code === 11000) {
        throw new Error("Book with this title already exists!");
      }
      throw new Error("Failed to add book.");
    }
    },
  },
};

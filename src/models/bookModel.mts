export interface Book {
    id: string;
    title: string;
    author: string;
    description?: string;
    price: number;
    category: string;
}

export const books: Book[] = [
  {
    id: "1",
    title: "1984",
    author: "George Orwell",
    description: "A dystopian novel",
    category: "Drama",
    price: 9.99,
  },
  {
    id: "2",
    title: "Shining",
    author: "Stephen King",
    description: null,
    category: "Horror",
    price: 19.99,
  },
];
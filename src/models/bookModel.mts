export interface Book {
    _id: string;
    title: string;
    author: string;
    description?: string;
    price: number;
    category: string;
}

export type CreateBookInput = Omit<Book, "_id">;
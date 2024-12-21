export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}
export interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    file_url: string;
    image_url: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
export type BooksProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    books: Book[];
};
export type BookProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    book: Book;
};

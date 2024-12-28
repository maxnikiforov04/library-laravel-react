// resources/js/Pages/Book/MainPage.tsx

import MainLayout from '@/Layouts/MainLayout';
import { BooksProps } from '@/types';

export default function MainPage({ auth, books }: BooksProps) {
    console.log(books);
    return (
        <div className="h-screen">
            <MainLayout auth={auth} />
            <div className="container mx-auto mt-4">
                <h1 className="mb-4 text-2xl font-bold">Books List</h1>
                {books.length === 0 ? (
                    <p>No books available.</p>
                ) : (
                    <div className="grid gap-24 sm:grid-cols-2 lg:grid-cols-3">
                        {books.map((element) => (
                            <div
                                className="card w-96 bg-base-100 shadow-xl"
                                key={element.id}
                            >
                                <figure>
                                    <img
                                        src={element.image_url}
                                        alt={element.title}
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {element.title}
                                    </h2>
                                    <p>{element.description}</p>
                                    <div className="card-actions justify-end">
                                        <a
                                            className="btn"
                                            href={'download_book/' + element.id}
                                        >
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

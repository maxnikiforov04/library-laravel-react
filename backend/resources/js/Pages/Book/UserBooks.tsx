// resources/js/Pages/Book/MainPage.tsx

import MainLayout from '@/Layouts/MainLayout';
import { BooksProps } from '@/types';
import { Link } from '@inertiajs/react';

export default function UserBooks({ auth, books }: BooksProps) {
    return (
        <div className="h-screen">
            <MainLayout auth={auth} />
            <div className="container mx-auto mt-4">
                <h1 className="mb-4 text-2xl font-bold">Books List</h1>
                {books.length === 0 ? (
                    <p>No books available.</p>
                ) : (
                    <div className="flex flex-wrap justify-between gap-24">
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
                                    <div className="flex justify-between">
                                        <div className="card-actions">
                                            <Link
                                                className="btn"
                                                method="get"
                                                as="buttons"
                                                href={'edit-book/' + element.id}
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                        <div className="card-actions">
                                            <Link
                                                className="btn text-red-500"
                                                method="delete"
                                                as="buttons"
                                                href={'my-books/' + element.id}
                                            >
                                                Delete
                                            </Link>
                                        </div>
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

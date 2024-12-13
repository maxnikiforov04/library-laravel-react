import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';

export default function MainLayout({ auth }: PageProps) {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a href="/all-books" className="btn btn-ghost text-xl">
                    Free Lib
                </a>
            </div>
            <div className="flex-none">
                {auth.user ? (
                    <div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn m-1">
                                {auth.user.name}
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
                            >
                                <li>
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md"
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route('create-book')}
                                        className="rounded-md"
                                    >
                                        Create Book
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route('logout')}
                                        className="rounded-md text-error"
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link
                            href={route('login')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Log in
                        </Link>
                        <Link
                            href={route('register')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('all-books', [BookController::class, 'read_all_books']);

Route::get('create-book', function () {
    return Inertia::render('Book/CreateBook');
})->name('create-book');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('store_book', [BookController::class, 'store'])->name('store.book');

Route::get('download_book/{book}', [BookController::class, 'download_pdf'])->name('download.book');

Route::patch('book-update/{book}', [BookController::class, 'update'])->name('book.update');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('my-books', [BookController::class, 'user_books'])->name('books.index');
    Route::delete('my-books/{book}', [BookController::class, 'destroy'])->name('books.destroy');
    Route::get('edit-book/{book_id}', [BookController::class, 'edit_book'])->name('books.edit');

});

require __DIR__.'/auth.php';

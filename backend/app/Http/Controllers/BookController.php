<?php

namespace App\Http\Controllers;

use App\Http\Requests\Book\StoreRequest;
use App\Http\Requests\Book\UpdateRequest;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BookController extends Controller
{
    public function read_all_books()
    {
        $books = Book::all();
        return Inertia::render('Book/MainPage', [
            'books' => $books
        ]);
    }
    public function store(StoreRequest $request)
    {
        $data = $request->validated();
        try {
            if ($request->hasFile('file_url') && $request->hasFile('image_url')) {
                $path_to_file = $request->file('file_url')->store('books', 'public');
                $path_to_image = $request->file('image_url')->store('images', 'public');
                $data['file_url'] = Storage::url($path_to_file);
                $data['image_url'] = Storage::url($path_to_image);
            }
            $request->session()->push('books', $data);
            Book::create($data);
            return redirect()->route('books.index');
        } catch (\Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage()
            ], 500);
        }
    }

    public function download_pdf(Book $book)
    {
        $element = Book::find($book)[0]->toArray()['file_url'];
        if ($element) {
            return Storage::download($element);
        }

        return response()->json(['message' => 'Book not found'], 404);
    }

    public function user_books()
    {
        $books = Book::all();
        $book = Book::all()->where('user_id', '=', auth()->user()->id)->toArray();
        return Inertia::render('Book/UserBooks', [
            'books' => $book
        ]);
    }

    public function destroy(Book $book)
    {
        $book->delete();
        return 0;
    }

    public function edit_book(Book $book_id)
    {
        $current_book = Book::find($book_id)->first();
        return Inertia::render('Book/EditBook', [
            'book' => $current_book
        ]);
    }

    public function update(Book $book, UpdateRequest $request)
    {
        $data = $request->validated();
        Book::where('id', $book['id'])->update(array_filter($data));
    }
}

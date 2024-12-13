<?php

namespace App\Http\Controllers;

use App\Http\Requests\Book\StoreRequest;
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
                $path_to_file = $request->file('file_url')->store('books');
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
        $book = Book::all()->where('user_id', '=', auth()->user()->id);
        return Inertia::render('Book/UserBooks', [
            'books' => $book
        ]);
    }

    public function destroy(Book $book)
    {
        $book->delete();
        return 0;
    }

    public function edit_book(Book $book)
    {
        $current_book = Book::all()->where('id','=',$book);
        return Inertia::render('Book/UserBooks', [
            'books' => $current_book
        ]);
    }
}

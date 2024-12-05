<?php

namespace App\Http\Controllers;

use App\Http\Requests\Book\StoreRequest;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    public function store(StoreRequest $request)
    {
        $data = $request->validated();
        try {
            if ($request->hasFile('file_url')) {
                $path = $request->file('file_url')->store('books');
                $data['file_url'] = $path;
            }
            $request->session()->push('books', $data);
            Book::create($data);
            return response()->json(['message' => 'Book created successfully']);
        } catch (\Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage()
            ], 500);
        }
    }

    public function read_all_user_books()
    {
        dd( session()->get('books'));
    }
}

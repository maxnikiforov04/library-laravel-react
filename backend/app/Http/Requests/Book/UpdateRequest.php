<?php

namespace App\Http\Requests\Book;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255', // Change to string instead of array
            'description' => 'required|string|max:1200',
            'file_url' => 'nullable|file|mimes:pdf',
            'image_url' => 'nullable|file|mimes:jpg,jpeg,png',
            'user_id' => 'required|integer|exists:users,id'
        ];
    }
}

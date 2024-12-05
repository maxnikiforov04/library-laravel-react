import PrimaryButton from '@/Components/PrimaryButton';
import MainLayout from '@/Layouts/MainLayout';
import { PageProps } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function CreateBook({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        author: '',
        description: '',
        file_url: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        if (!data.file_url) {
            alert('Please select a file to upload.');
            return;
        }
        post(route('store.book'), {
            onSuccess: () => {
                // Reset form after successful submission
                reset();
            },
            onError: (errors) => {
                console.error(errors); // Log errors for debugging
            },
        });
    };
    return (
        <div className="h-screen">
            <MainLayout auth={auth} />
            <div className="flex h-full flex-col items-center justify-center">
                <form method="Post" onSubmit={submit} className="w-1/3">
                    <label className="text-2xl text-accent">Add new book</label>
                    <div className="mt-6 flex flex-col gap-y-6">
                        <input
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            name="author"
                            value={data.author}
                            onChange={(e) => setData('author', e.target.value)}
                            placeholder="Author"
                            className="input input-bordered w-full"
                        />

                        <textarea
                            name="description"
                            value={data.description}
                            placeholder="Description"
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            className="textarea textarea-bordered h-40 w-full"
                        />
                    </div>
                    <div className="mt-6 flex justify-between">
                        <input
                            name="file"
                            type="file"
                            accept=".pdf" // Restrict to PDF files if that's your requirement
                            onChange={(e) => {
                                const file_url = e.target.files?.[0] || null; // Use optional chaining
                                setData('file_url', file_url); // Set the file object or null
                            }}
                            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                        />
                        {errors.file_url && (
                            <span className="text-red-500">
                                {errors.file_url}
                            </span>
                        )}
                        <PrimaryButton
                            className="btn btn-outline btn-accent w-32"
                            disabled={processing}
                        >
                            Submit
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}

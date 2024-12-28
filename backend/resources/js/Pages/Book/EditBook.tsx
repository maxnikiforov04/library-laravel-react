import PrimaryButton from '@/Components/PrimaryButton';
import MainLayout from '@/Layouts/MainLayout';
import { BookProps } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function EditBook({ auth, book }: BookProps) {
    const { data, setData, patch, processing, reset } = useForm({
        title: book.title || '',
        author: book.author || '',
        description: book.description || '',
        user_id: auth.user.id,
    });
    console.log(data);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('book.update', book.id), {
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };
    return (
        <div className="h-screen">
            <MainLayout auth={auth} />
            <div className="flex h-4/5 flex-col items-center justify-center">
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
                    <div className="flex justify-end">
                        <PrimaryButton
                            className="btn btn-outline btn-accent mt-6 w-32"
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

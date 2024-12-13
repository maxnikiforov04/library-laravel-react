import PrimaryButton from '@/Components/PrimaryButton';
import MainLayout from '@/Layouts/MainLayout';
import { PageProps } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function EditBook({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        author: '',
        description: '',
        file_url: null as File | null,
        image_url: null as File | null,
        user_id: auth.user.id,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        if (!data.file_url || !data.image_url) {
            alert('Please select a file to upload.');
            return;
        }
        post(route('store.book'), {
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
                    <div className="mt-6 flex justify-between space-x-8">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">
                                    Pick a book file
                                </span>
                            </div>
                            <input
                                name="file"
                                type="file"
                                accept=".pdf"
                                onChange={(e) => {
                                    const file_url =
                                        e.target.files?.[0] || null;
                                    setData('file_url', file_url);
                                }}
                                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">
                                    Pick a book image
                                </span>
                            </div>
                            <input
                                name="image"
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={(e) => {
                                    const image_url =
                                        e.target.files?.[0] || null;
                                    setData('image_url', image_url);
                                }}
                                className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
                            />
                        </label>

                        {errors.file_url && (
                            <span className="text-red-500">
                                {errors.file_url}
                            </span>
                        )}
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

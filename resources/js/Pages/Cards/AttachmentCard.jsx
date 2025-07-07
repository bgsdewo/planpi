import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { flashMessage } from '@/lib/utils';
import { Transition } from '@headlessui/react';
import { router, useForm } from '@inertiajs/react';
import { PiPaperclip } from 'react-icons/pi';
import { toast } from 'sonner';

export default function AttachmentCard({ action, attachments }) {
    // Langkah 1: Hapus 'link' dari sini
    const { data, setData, processing, errors, reset, post, recentlySuccessful } = useForm({
        file: '',
        name: '',
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
                reset();
            },
        });
    };

    return (
        <Card className="md:col-span-2">
            <CardContent>
                <form onSubmit={onHandleSubmit}>
                    <div className="py-6">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <InputLabel htmlFor="file" value="File" />
                                <TextInput
                                    type="file"
                                    name="file"
                                    id="file"
                                    onChange={(e) => setData(e.target.name, e.target.files[0])}
                                    className="mt-1"
                                />
                                {errors.file && <InputError message={errors.file} />}
                            </div>

                            {/* Langkah 2: Blok input untuk 'link' sudah dihapus dari sini */}

                            <div className="col-span-full">
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={data.name}
                                    onChange={onHandleChange}
                                    className="mt-1"
                                    required
                                />
                                {errors.name && <InputError message={errors.name} />}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-x-2 py-6">
                        <Button type="button" variant="ghost" onClick={() => reset()}>
                            Reset
                        </Button>
                        <Button type="submit" variant="red" disabled={processing}>
                            Save
                        </Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-muted-foreground">Saved.</p>
                        </Transition>
                    </div>
                </form>
                <div className="space-y-4 py-6">
                    <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                        {attachments.map((attachment, index) => {
                            // Langkah 3: Sederhanakan logika URL, hanya untuk file
                            if (!attachment.file) return null; // Jangan tampilkan jika bukan file

                            const fileUrl = `/storage/${attachment.file}`;

                            return (
                                <li
                                    key={index}
                                    className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                                >
                                    <div className="flex w-0 flex-1 items-center">
                                        <PiPaperclip className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                                        <div className="ml-4 flex min-w-0 flex-col">
                                            <a
                                                href={fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="truncate font-medium text-blue-600 hover:underline"
                                            >
                                                {attachment.name ? attachment.name : attachment.file}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex shrink-0">
                                        <Button
                                            variant="link"
                                            className="font-medium text-red-500 hover:text-red-600 hover:no-underline"
                                            onClick={() =>
                                                router.delete(
                                                    route('attachments.destroy', {
                                                        card: attachment.card_id,
                                                        attachment: attachment.id,
                                                    }),
                                                    {
                                                        preserveScroll: true,
                                                        preserveState: true,
                                                        onSuccess: (success) => {
                                                            const flash = flashMessage(success);
                                                            if (flash) toast[flash.type](flash.message);
                                                        },
                                                    },
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}

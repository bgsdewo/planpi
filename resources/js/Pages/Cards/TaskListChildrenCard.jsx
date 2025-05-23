import { Button } from '@/Components/ui/button';
import { flashMessage } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { PiCheckSquareFill, PiSquare } from 'react-icons/pi';
import { toast } from 'sonner';

export default function TaskListChildrenCard({ children }) {
    // Salin props children ke state lokal
    const [taskList, setTaskList] = useState(children);

    // Sync ulang saat props berubah
    useEffect(() => {
        setTaskList(children);
    }, [children]);

    // Fungsi toggle is_completed secara lokal
    const handleToggle = (item) => {
        router.put(
            route('tasks.completed', {
                card: item.card_id,
                task: item.id,
            }),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (success) => {
                    const flash = flashMessage(success);
                    if (flash) toast[flash.type](flash.message);

                    // Update state lokal agar ikon langsung berubah
                    setTaskList((prev) =>
                        prev.map((task) =>
                            task.id === item.id ? { ...task, is_completed: !task.is_completed } : task,
                        ),
                    );
                },
            },
        );
    };

    const handleDelete = (item) => {
        router.delete(
            route('tasks.destroy', {
                card: item.card_id,
                task: item.id,
            }),
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (success) => {
                    const flash = flashMessage(success);
                    if (flash) toast[flash.type](flash.message);

                    // Hapus dari state lokal
                    setTaskList((prev) => prev.filter((task) => task.id !== item.id));
                },
            },
        );
    };
    return (
        <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
            {children.length > 0 &&
                children.map((item, index) => (
                    <li key={index} className="flex items-center justify-between py-6 text-sm leading-relaxed">
                        <div className="flex w-0 flex-1 items-center">
                            <Button type="button" size="icon" variant="ghost" onClick={() => handleToggle(item)}>
                                {item.is_completed ? (
                                    <PiCheckSquareFill className="h-5 w-5 flex-shrink-0 text-foreground" />
                                ) : (
                                    <PiSquare className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                                )}
                            </Button>
                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                <span className={`truncate font-medium ${item.is_completed ? 'line-through' : ''}`}>
                                    {item.title}
                                </span>
                            </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                            <Button
                                variant="link"
                                className="font-medium text-red-500 hover:text-red-600 hover:no-underline"
                                onClick={() =>
                                    router.delete(
                                        route('tasks.destroy', {
                                            card: item.card_id,
                                            task: item.id,
                                        }),
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
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
                ))}
        </ul>
    );
}

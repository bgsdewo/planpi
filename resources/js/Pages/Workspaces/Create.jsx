import HeaderForm from '@/Components/HeaderForm';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Card, CardContent } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import AppLayout from '@/Layouts/AppLayout';

export default function Create({ page_settings, visibilities }) {
    return (
        <>
            <div className="space-y-10 divide-y divide-dashed divide-gray-900/10">
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
                    <HeaderForm className="mb-8" title={page_settings.title} subtitle={page_settings.subtitle} />

                    <Card className="md:col-span-2">
                        <CardContent>
                            <form>
                                <div className="py-6">
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="name" value="Name" />
                                            <TextInput type="text" name="name" id="name" />
                                        </div>
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="cover" value="Cover" />
                                            <TextInput type="file" name="cover" id="cover" />
                                        </div>
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="logo" value="Logo" />
                                            <TextInput type="file" name="logo" id="logo" />
                                        </div>
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="visibility" value="Visibility" />
                                            <Select defaultValue="Select a visibility">
                                                <SelectTrigger>
                                                    <SelectValue>Select a visibility</SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {visibilities.map((visibility, index) => (
                                                        <SelectItem key={index} value={visibility.value}>
                                                            {visibility.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Create.layout = (page) => <AppLayout children={page} title="Workspace Create" />;

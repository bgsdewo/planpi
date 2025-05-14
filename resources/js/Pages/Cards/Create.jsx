import HeaderForm from '@/Components/HeaderForm';
import AppLayout from '@/Layouts/AppLayout';

export default function Create({ page_settings, statuses, priorities, workspace }) {
    return (
        <div className="space-y-10 divide-y divide-dashed divide-gray-900/10">
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
                <HeaderForm title="Information" subtitle="Add your card information" />
            </div>
        </div>
    );
}
Create.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;

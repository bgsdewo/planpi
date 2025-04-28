import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard() {
    return <div>This is a Dashboard</div>;
}
Dashboard.layout = (page) => <AppLayout children={page} title="Dashboard" />;

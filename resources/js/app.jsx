import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { hydrateRoot } from 'react-dom/client';
import ClientOnly from './Components/ClientOnly'; // ✅ Tambahkan ini
import { ThemeProvider } from './Components/ThemeProvider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        hydrateRoot(
            el,
            <ClientOnly>
                {' '}
                {/* ✅ Bungkus App pakai ClientOnly */}
                <ThemeProvider defaultTheme="dark" storageKey="current-theme">
                    <App {...props} />
                </ThemeProvider>
            </ClientOnly>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

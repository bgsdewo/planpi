'use client'; // jika pakai Next.js, ini wajib

import { useEffect, useState } from 'react';
import { Toaster } from './sonner'; // ← ini file custom kamu

const ClientOnlyToaster = (props) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return <Toaster {...props} />;
};

export default ClientOnlyToaster;

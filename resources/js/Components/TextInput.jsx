import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => localRef.current); // ✅ expose langsung elemen input

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <div className="mt-2">
            <input
                {...props}
                type={type}
                className={
                    'block w-full rounded-md border border-input bg-background p-2 text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:right-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6' +
                    className
                }
                ref={localRef}
            />
        </div>
    );
});

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => localRef.current);

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    // Pisahkan value & onChange dari props
    const { value, onChange, ...restProps } = props;

    return (
        <div className="mt-2">
            <input
                type={type}
                ref={localRef}
                className={
                    'block w-full rounded-md border border-input bg-background p-2 text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:right-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6 ' +
                    className
                }
                {...(type === 'file' ? { onChange } : { value, onChange })}
                {...restProps}
            />
        </div>
    );
});

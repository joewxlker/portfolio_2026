"use client"

import { useEffect } from 'react';

export const Modal = ({ isOpen, onClose, children, ariaLabel }: { isOpen: boolean, onClose: () => void, children: React.ReactNode, ariaLabel: string }) => {
    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            className='fixed inset-0 z-50 flex items-center justify-center bg-[color-mix(in_oklab,var(--color-shadow)_60%,transparent)] backdrop-blur-sm'
            onMouseDown={onClose}>
                <div
                    className='w-225 max-w-[95vw] max-h-[95vh] overflow-hidden rounded-lg border border-[color-mix(in_oklab,var(--color-trim)_20%,transparent)] bg-modal'
                    onMouseDown={(event) => event.stopPropagation()}>
                        {children}
                </div>
        </div>
    )
}
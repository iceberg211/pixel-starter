"use client";

import React from "react";

const cx = (...classes: Array<string | false | undefined | null>) => classes.filter(Boolean).join(" ");

export const PixelButton: React.FC<{
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    className?: string;
    asChild?: boolean;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
}> = ({ children, variant = "primary", className, disabled, type = "button", onClick }) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={cx("pixel-button", variant, disabled && "opacity-60 cursor-not-allowed", className)}
        >
            {children}
        </button>
    );
};

export const PixelCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    variant?: "light" | "dark" | "soft";
}> = ({ children, className, variant = "light" }) => {
    return (
        <div className={cx("pixel-card", variant === "dark" && "dark", variant === "soft" && "soft", className)}>
            {children}
        </div>
    );
};

export const PixelBadge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return <span className={cx("pixel-badge", className)}>{children}</span>;
};

export const PixelField: React.FC<{
    label?: string;
    hint?: string;
    required?: boolean;
    children: React.ReactNode;
}> = ({ label, hint, required, children }) => {
    return (
        <label className="flex flex-col gap-2">
            {label && (
                <div className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </div>
            )}
            {children}
            {hint && <span className="text-xs text-neutral-500 font-mono">{hint}</span>}
        </label>
    );
};

export const PixelDivider: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cx("w-full border-t-2 border-[var(--px-outline)] border-dashed", className)} />
);

export const StatTile: React.FC<{
    label: string;
    value: React.ReactNode;
    hint?: string;
    dark?: boolean;
}> = ({ label, value, hint, dark }) => (
    <PixelCard className="p-4" variant={dark ? "dark" : "light"}>
        <div className="text-xs uppercase tracking-wide font-bold opacity-70">{label}</div>
        <div className="text-3xl font-black mt-2 font-mono">{value}</div>
        {hint && <div className="text-xs mt-2 font-mono opacity-60">{hint}</div>}
    </PixelCard>
);

export const PixelInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => <input ref={ref} {...props} className={cx("pixel-input", className)} />,
);
PixelInput.displayName = "PixelInput";

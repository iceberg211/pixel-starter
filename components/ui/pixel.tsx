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

/* === NEW UI COMPONENTS === */

// Progress Bar
export const PixelProgressBar: React.FC<{
    value: number;
    max?: number;
    label?: string;
    variant?: "default" | "neon" | "energy";
    showPercentage?: boolean;
    className?: string;
}> = ({ value, max = 100, label, variant = "default", showPercentage = true, className }) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const variantClasses = {
        default: "bg-[var(--px-outline)]",
        neon: "bg-[var(--px-outline)]",
        energy: "bg-[var(--px-outline)]",
    };

    return (
        <div className={cx("space-y-2", className)}>
            {label && (
                <div className="flex justify-between items-center text-sm font-bold">
                    <span>{label}</span>
                    {showPercentage && <span>{Math.round(percentage)}%</span>}
                </div>
            )}
            <div className="h-6 border-2 border-[var(--px-outline)] bg-[var(--px-white)] relative overflow-hidden">
                <div
                    className={cx("h-full transition-all duration-300", variantClasses[variant])}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

// Energy Bar (Health/Mana style)
export const EnergyBar: React.FC<{
    current: number;
    max: number;
    type?: "health" | "mana" | "energy";
    label?: string;
    className?: string;
}> = ({ current, max, type = "health", label, className }) => {
    const percentage = Math.min(Math.max((current / max) * 100, 0), 100);

    const typeColors = {
        health: "bg-[var(--px-black)]",
        mana: "bg-[var(--px-gray)]",
        energy: "bg-[var(--px-mid)]",
    };

    return (
        <div className={cx("space-y-1", className)}>
            {label && <div className="text-xs font-bold uppercase tracking-wide">{label}</div>}
            <div className="flex items-center gap-2">
                <div className="flex-1 h-4 border-2 border-[var(--px-outline)] bg-[var(--px-deep)] relative overflow-hidden">
                    <div
                        className={cx("h-full transition-all duration-150", typeColors[type])}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <div className="text-xs font-mono font-bold min-w-[60px]">
                    {current}/{max}
                </div>
            </div>
        </div>
    );
};

// Status Indicator
export const StatusIndicator: React.FC<{
    status: "online" | "offline" | "away" | "busy";
    label?: string;
    pulse?: boolean;
    className?: string;
}> = ({ status, label, pulse = true, className }) => {
    const statusColors = {
        online: "bg-[var(--px-black)]",
        offline: "bg-[var(--px-gray)]",
        away: "bg-[var(--px-mid)]",
        busy: "bg-[var(--px-outline)]",
    };

    const statusLabels = {
        online: "在线",
        offline: "离线",
        away: "离开",
        busy: "忙碌",
    };

    return (
        <div className={cx("inline-flex items-center gap-2", className)}>
            <div className="relative">
                <div className={cx("w-3 h-3 border-2 border-[var(--px-outline)]", statusColors[status])} />
                {pulse && status === "online" && (
                    <div className={cx("absolute inset-0 w-3 h-3 animate-pixel-pulse", statusColors[status])} />
                )}
            </div>
            {label && <span className="text-sm font-bold uppercase">{label || statusLabels[status]}</span>}
        </div>
    );
};

// Terminal/Console
export const PixelTerminal: React.FC<{
    lines: string[];
    prompt?: string;
    className?: string;
}> = ({ lines, prompt = ">", className }) => {
    return (
        <div className={cx("pixel-card bg-black text-green-400 font-mono text-sm p-4 space-y-1", className)}>
            {lines.map((line, i) => (
                <div key={i} className="flex gap-2">
                    <span className="text-green-500">{prompt}</span>
                    <span>{line}</span>
                </div>
            ))}
            <div className="flex gap-2">
                <span className="text-green-500">{prompt}</span>
                <span className="animate-pixel-blink">_</span>
            </div>
        </div>
    );
};

// Toast Notification
export const PixelToast: React.FC<{
    message: string;
    type?: "info" | "success" | "warning" | "error";
    onClose?: () => void;
    className?: string;
}> = ({ message, type = "info", onClose, className }) => {
    const typeStyles = {
        info: "border-[var(--px-outline)] bg-[var(--px-soft)] text-[var(--px-black)]",
        success: "border-[var(--px-black)] bg-[var(--px-white)] text-[var(--px-black)]",
        warning: "border-[var(--px-gray)] bg-[var(--px-soft)] text-[var(--px-black)]",
        error: "border-[var(--px-outline)] bg-[var(--px-deep)] text-[var(--px-white)]",
    };

    return (
        <div className={cx("pixel-card p-4 flex items-center justify-between gap-4 animate-slide-in", typeStyles[type], className)}>
            <span className="font-bold">{message}</span>
            {onClose && (
                <button onClick={onClose} className="text-2xl leading-none hover:scale-110 transition-transform">
                    ×
                </button>
            )}
        </div>
    );
};

// Toggle Switch
export const PixelToggle: React.FC<{
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    className?: string;
}> = ({ checked, onChange, label, className }) => {
    return (
        <label className={cx("inline-flex items-center gap-3 cursor-pointer", className)}>
            <div
                className={cx(
                    "relative w-14 h-7 border-2 border-[var(--px-outline)] transition-colors",
                    checked ? "bg-[var(--px-black)]" : "bg-[var(--px-soft)]"
                )}
                onClick={() => onChange(!checked)}
            >
                <div
                    className={cx(
                        "absolute top-0.5 w-5 h-5 bg-[var(--px-outline)] transition-all duration-200",
                        checked ? "left-[30px]" : "left-0.5"
                    )}
                />
            </div>
            {label && <span className="font-bold">{label}</span>}
        </label>
    );
};

// Pixel Tabs
export const PixelTabs: React.FC<{
    tabs: { id: string; label: string; content: React.ReactNode }[];
    defaultTab?: string;
    className?: string;
}> = ({ tabs, defaultTab, className }) => {
    const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]?.id);

    return (
        <div className={cx("space-y-4", className)}>
            <div className="flex gap-2 border-b-2 border-[var(--px-outline)]">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cx(
                            "px-4 py-2 font-bold uppercase text-sm transition-all",
                            activeTab === tab.id
                                ? "bg-[var(--px-black)] text-[var(--px-white)] translate-y-[2px]"
                                : "bg-[var(--px-soft)] hover:bg-[var(--px-gray)] hover:text-white"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div>
                {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>
        </div>
    );
};

// Loading Spinner
export const PixelSpinner: React.FC<{
    size?: "sm" | "md" | "lg";
    className?: string;
}> = ({ size = "md", className }) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12",
    };

    return (
        <div className={cx("inline-block border-4 border-[var(--px-outline)] border-t-transparent animate-spin", sizeClasses[size], className)} />
    );
};

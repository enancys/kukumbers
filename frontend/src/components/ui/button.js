import React from "react";

export function Button({
    children,
    className = "",
    onClick,
    size = "md",
    variant = "default",
    type = "button",
    ...props
}) {
    const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";

    const sizeMap = {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
    };

    const variantMap = {
        default: "bg-emerald-500 hover:bg-emerald-600 text-white",
        outline: "border border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent",
    };

    return (
        <button
            type={type}
            className={`${base} ${sizeMap[size]} ${variantMap[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}

import React from "react";

export function Badge({ className = "", children, variant = "default" }) {
    const base = "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium";
    const variants = {
        default: "bg-slate-700 text-white",
        outline: "border border-slate-600 text-slate-300",
    };

    return <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>;
}

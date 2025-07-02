import React from "react";

export function Card({ className = "", children }) {
    return (
        <div className={`rounded-lg border border-slate-700 bg-slate-800 shadow ${className}`}>
            {children}
        </div>
    );
}

export function CardContent({ className = "", children }) {
    return <div className={`p-4 ${className}`}>{children}</div>;
}

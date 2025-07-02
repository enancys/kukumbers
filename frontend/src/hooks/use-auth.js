import { useState, useEffect } from "react";

// Nama key di localStorage
const STORAGE_KEY = "auth_user";

export function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Ambil user dari localStorage saat komponen mount
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setUser(parsed);
            } catch (e) {
                console.error("Failed to parse user from localStorage:", e);
            }
        }
    }, []);

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
        window.location.href = "/login"; // redirect manual
    };

    return { user,     isAuthenticated: !!user, logout };
}

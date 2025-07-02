import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Gamepad2, LogInIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import { useAuth } from "../../hooks/use-auth";

const mainLinks = [
    { href: "/", label: "Home" },
    { href: "/games", label: "Games" },
    { href: "/dashboard_game", label: "Dashboard" },
    { href: "/reviews", label: "Reviews" },
];

export default function ComponentHeader() {
    const location = useLocation();
    const pathname = location.pathname;
    const { user, logout } = useAuth();
    const [isExpanded, setIsExpanded] = useState(false);

    const renderLinks = () =>
        mainLinks.map((link) => (
            <li className="nav-item" key={link.href}>
                <Link
                    className={`nav-link px-3 text-sm ${pathname === link.href ? "active fw-semibold text-white" : "text-light"
                        }`}
                    to={link.href}
                    onClick={() => setIsExpanded(false)}
                >
                    {link.label}
                </Link>
            </li>
        ));

    return (
        <header className="sticky-top border-bottom bg-dark shadow-sm py-2">
            <div className="container d-flex justify-content-between align-items-center">
                {/* Left - Brand and Links */}
                <div className="d-flex align-items-center gap-3">
                    {/* Hamburger for mobile */}
                    <button
                        className="btn btn-outline-light d-md-none p-1"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <MenuIcon size={20} />
                        <span className="visually-hidden">Toggle navigation</span>
                    </button>

                    {/* Brand */}
                    <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
                        <Gamepad2 className="text-primary" size={22} />
                        <span className="text-white fw-bold fs-5">MyBacklog</span>
                    </Link>

                    {/* Desktop links */}
                    <ul className="navbar-nav d-none d-md-flex flex-row gap-2 mb-0">
                        {renderLinks()}
                    </ul>
                </div>

                {/* Right - Auth Actions */}
                <div className="d-flex align-items-center gap-2">
                    {user ? (
                        <>
                            <Link
                                to="/profile"
                                className="btn btn-outline-light btn-sm d-flex align-items-center gap-2"
                            >
                                <UserIcon size={16} />
                                <span>{user.name}</span>
                                {user.role && (
                                    <span
                                        className={`badge rounded-pill px-2 py-1 ${user.role === "admin"
                                                ? "bg-success text-white"
                                                : "bg-secondary text-white"
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                )}
                            </Link>
                            {user.role === "admin" && (
                                <Link to="/admin/" className="btn btn-outline-primary btn-sm">
                                    Admin Panel
                                </Link>
                            )}
                            <button className="btn btn-outline-danger btn-sm" onClick={logout}>
                                <LogOutIcon size={16} className="me-1" /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline-light btn-sm">
                                <LogInIcon size={16} className="me-1" /> Login
                            </Link>
                            <Link to="/register" className="btn btn-primary btn-sm d-flex align-items-center gap-1">
                                <LogInIcon size={16} /> Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile links */}
            {isExpanded && (
                <div className="bg-dark d-md-none">
                    <ul className="navbar-nav px-3 pt-2 pb-3 border-top border-secondary">
                        {renderLinks()}
                    </ul>
                </div>
            )}
        </header>
    );
}
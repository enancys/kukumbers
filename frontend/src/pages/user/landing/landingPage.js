"use client"

import ComponentHeader from "./../../../components/user/ComponentHeader"
import { Link } from "react-router-dom"
import { Gamepad2, Users, Star, LogInIcon } from "lucide-react"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <ComponentHeader />

            {/* Hero Section */}
            <section className="py-24 bg-gradient-to-r from-slate-800 to-slate-700 text-center px-4">
                <h1 className="text-5xl font-bold mb-4">
                    Welcome to <span className="text-emerald-400">MyBacklog</span>
                </h1>
                <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                    Track your games, write reviews, and discover your next favorite title.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/register">
                        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg text-lg font-semibold">
                            Get Started
                        </button>
                    </Link>
                    <Link to="/games">
                        <button className="border border-slate-500 hover:bg-slate-800 px-6 py-3 rounded-lg text-lg text-slate-300">
                            Browse Games
                        </button>
                    </Link>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-slate-800/40">
                <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center">
                        <Gamepad2 className="h-10 w-10 text-emerald-400 mb-4" />
                        <h3 className="text-2xl font-bold mb-1">10,000+</h3>
                        <p className="text-slate-400">Games Listed</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Users className="h-10 w-10 text-blue-400 mb-4" />
                        <h3 className="text-2xl font-bold mb-1">5,000+</h3>
                        <p className="text-slate-400">Active Users</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Star className="h-10 w-10 text-yellow-400 mb-4" />
                        <h3 className="text-2xl font-bold mb-1">25,000+</h3>
                        <p className="text-slate-400">Reviews Written</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 text-center">
                <h2 className="text-3xl font-bold mb-4">Start Building Your Game Library Today</h2>
                <p className="text-slate-400 mb-6">Join now and manage your gaming experience like a pro!</p>
                <Link to="/login">
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-lg flex items-center justify-center gap-2 text-lg">
                        <LogInIcon className="w-5 h-5" />
                        Login to Get Started
                    </button>
                </Link>
            </section>

            {/* Footer */}
            <footer className="bg-slate-800 border-t border-slate-700 mt-12">
                <div className="container mx-auto px-4 py-8 text-center text-slate-400 text-sm">
                    © 2025 MyBacklog. All rights reserved.
                </div>
            </footer>
        </div>
    )
}

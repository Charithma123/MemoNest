"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BiPlus, BiMenu, BiX } from 'react-icons/bi';
import { useAuth } from './context/AuthContext';

function Nav() {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full border-b border-mist">
            <div className="w-[90%] max-w-6xl mx-auto h-16 sm:h-[14vh] flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/images/logo.jpg" alt="MemoNest" height={44} width={44} className="rounded-xl" />
                    <span className="font-display text-2xl text-ink hidden sm:block">MemoNest</span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden sm:flex items-center gap-3">
                    <Link href="/add-note">
                        <div className="flex items-center gap-2 bg-honey hover:bg-honey-deep transition-colors duration-200 rounded-full pl-2 pr-4 py-2 shadow-sm">
                            <span className="w-7 h-7 bg-ink rounded-full flex items-center justify-center">
                                <BiPlus className="text-honey w-5 h-5" />
                            </span>
                            <span className="text-sm font-semibold text-ink uppercase tracking-wide">
                                Add Note
                            </span>
                        </div>
                    </Link>

                    <Link href="/add-journal">
                        <div className="flex items-center gap-2 bg-mist hover:bg-nest hover:text-canvas transition-colors duration-200 rounded-full px-4 py-2 text-sm font-semibold text-ink uppercase tracking-wide">
                            Journal
                        </div>
                    </Link>

                    {user ? (
                        <button
                            onClick={logout}
                            className="text-sm font-medium text-ink-soft hover:text-clay transition-colors px-3 py-2 rounded-full hover:bg-mist focus-visible:outline-2 focus-visible:outline-nest"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="text-sm font-medium text-ink-soft hover:text-nest transition-colors px-3 py-2 rounded-full hover:bg-mist focus-visible:outline-2 focus-visible:outline-nest"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile hamburger button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="sm:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-mist transition-colors"
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <BiX className="w-6 h-6 text-ink" /> : <BiMenu className="w-6 h-6 text-ink" />}
                </button>
            </div>

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <div className="sm:hidden border-t border-mist bg-paper animate-rise-in">
                    <div className="w-[90%] mx-auto py-4 flex flex-col gap-3">
                        <Link href="/add-note" onClick={() => setMenuOpen(false)}>
                            <div className="flex items-center gap-2 bg-honey hover:bg-honey-deep transition-colors duration-200 rounded-full pl-2 pr-4 py-2 shadow-sm w-fit">
                                <span className="w-7 h-7 bg-ink rounded-full flex items-center justify-center">
                                    <BiPlus className="text-honey w-5 h-5" />
                                </span>
                                <span className="text-sm font-semibold text-ink uppercase tracking-wide">
                                    Add Note
                                </span>
                            </div>
                        </Link>

                        <Link href="/add-journal" onClick={() => setMenuOpen(false)}>
                            <div className="flex items-center gap-2 bg-mist hover:bg-nest hover:text-canvas transition-colors duration-200 rounded-full px-4 py-2 text-sm font-semibold text-ink uppercase tracking-wide w-fit">
                                Journal
                            </div>
                        </Link>

                        {user ? (
                            <button
                                onClick={() => { logout(); setMenuOpen(false); }}
                                className="text-sm font-medium text-ink-soft hover:text-clay transition-colors px-3 py-2 rounded-full hover:bg-mist w-fit"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setMenuOpen(false)}
                                className="text-sm font-medium text-ink-soft hover:text-nest transition-colors px-3 py-2 rounded-full hover:bg-mist w-fit"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}

export default Nav;
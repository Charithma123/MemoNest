"use client"
import Image from 'next/image';
import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';
import { useAuth } from './context/AuthContext';

function Nav() {
    const { user, logout } = useAuth();

    return (
        <header className="w-full border-b border-mist">
            <div className="w-[90%] max-w-6xl mx-auto h-[14vh] flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/images/logo.jpg" alt="MemoNest" height={44} width={44} className="rounded-xl" />
                    <span className="font-display text-2xl text-ink hidden sm:block">MemoNest</span>
                </Link>

                <div className="flex items-center gap-3">
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
            </div>
        </header>
    )
}

export default Nav;
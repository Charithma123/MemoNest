"use client"
import { useState } from 'react';
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import Link from 'next/link';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { NestRings } from '../nestRings';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            router.push("/");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-[86vh] w-full flex flex-col md:flex-row">
            {/* Brand panel */}
            <div className="relative md:w-1/2 bg-nest-deep text-canvas flex flex-col justify-between overflow-hidden px-10 py-12 min-h-[280px]">
                <NestRings className="absolute -bottom-10 -left-10 w-[420px] h-[420px] text-honey" />
                <Link href="/" className="flex items-center gap-3 relative z-10">
                    <Image src="/images/logo.jpg" alt="MemoNest" height={40} width={40} className="rounded-lg" />
                    <span className="font-display text-xl">MemoNest</span>
                </Link>
                <p className="relative z-10 font-display text-3xl md:text-4xl italic leading-snug max-w-sm">
                    Where your thoughts come to rest.
                </p>
                <span className="relative z-10 text-xs uppercase tracking-[0.2em] text-canvas/60">
                    A quiet place to keep your notes
                </span>
            </div>

            {/* Form panel */}
            <div className="md:w-1/2 flex items-center justify-center px-6 py-14">
                <div className="w-full max-w-sm animate-rise-in">
                    <h1 className="font-display text-3xl text-ink mb-1">Welcome back</h1>
                    <p className="text-ink-soft text-sm mb-8">Log in to see what you've saved.</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="block w-full px-4 py-3 bg-paper border border-mist rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-nest transition-shadow"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="block w-full px-4 py-3 bg-paper border border-mist rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-nest transition-shadow"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full py-3 bg-nest text-canvas font-medium rounded-xl hover:bg-nest-deep transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nest"
                        >
                            Log in
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-6">
                        <span className="h-px flex-1 bg-mist" />
                        <span className="text-xs text-ink-soft uppercase tracking-wide">or</span>
                        <span className="h-px flex-1 bg-mist" />
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 py-3 bg-paper border border-mist rounded-xl hover:bg-mist transition-colors focus-visible:outline-2 focus-visible:outline-nest"
                    >
                        <FcGoogle className="w-5 h-5" />
                        <span className="text-sm font-medium text-ink">Continue with Google</span>
                    </button>

                    <p className="mt-8 text-sm text-ink-soft text-center">
                        New here?{" "}
                        <Link href="/register" className="text-nest font-semibold hover:underline">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
"use client"
import React, { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { NestRings } from "../nestRings";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reTypePassword, setReTypePassword] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== reTypePassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push("/");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-[86vh] w-full flex flex-col md:flex-row">
            <div className="relative md:w-1/2 bg-nest-deep text-canvas flex flex-col justify-between overflow-hidden px-10 py-12 min-h-[280px]">
                <NestRings className="absolute -top-16 -right-16 w-[420px] h-[420px] text-honey" />
                <Link href="/" className="flex items-center gap-3 relative z-10">
                    <Image src="/images/logo.jpg" alt="MemoNest" height={40} width={40} className="rounded-lg" />
                    <span className="font-display text-xl">MemoNest</span>
                </Link>
                <p className="relative z-10 font-display text-3xl md:text-4xl italic leading-snug max-w-sm">
                    Every thought deserves a nest of its own.
                </p>
                <span className="relative z-10 text-xs uppercase tracking-[0.2em] text-canvas/60">
                    Start keeping notes that stay found
                </span>
            </div>

            <div className="md:w-1/2 flex items-center justify-center px-6 py-14">
                <div className="w-full max-w-sm animate-rise-in">
                    <h1 className="font-display text-3xl text-ink mb-1">Create your account</h1>
                    <p className="text-ink-soft text-sm mb-8">Takes less than a minute.</p>

                    <form onSubmit={handleRegister} className="space-y-4">
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
                        <input
                            type="password"
                            placeholder="Retype password"
                            className="block w-full px-4 py-3 bg-paper border border-mist rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-nest transition-shadow"
                            required
                            value={reTypePassword}
                            onChange={(e) => setReTypePassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full py-3 bg-honey text-ink font-semibold rounded-xl hover:bg-honey-deep transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nest"
                        >
                            Register
                        </button>
                    </form>

                    <p className="mt-8 text-sm text-ink-soft text-center">
                        Already have an account?{" "}
                        <Link href="/login" className="text-nest font-semibold hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
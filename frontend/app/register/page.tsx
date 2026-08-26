"use client"
import React, { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

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
        <div className='w-[90%] mx-auto h-[14vh] flex items-center justify-center'>
            <Link href={"/"}>
                <Image src="/images/logo.jpg" alt="Logo" height={90} width={90} />
            </Link>

            <div className="w-[80%] max-w-md sm:w-[50%] mx-auto mt-20">
                <h1 className="text-2xl font-bold mb-6 mt-5 text-blue-400">Register</h1>

                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter Your email"
                        className="block w-full px-4 py-3 bg-gray-200 rounded-md outline-none"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="block w-full px-4 py-3 bg-gray-200 rounded-md outline-none"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Retype Your Password"
                        className="block w-full px-4 py-3 bg-gray-200 rounded-md outline-none"
                        required
                        value={reTypePassword}
                        onChange={(e) => setReTypePassword(e.target.value)}
                    />

                    <button type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-800">
                        Register
                    </button>
                </form>

                <p className="mt-4 text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
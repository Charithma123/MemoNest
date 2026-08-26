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


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/");

        } catch (error: any) {
            toast.error(error.message);

        }
    };

    const handleGoogleLogin = async()=>{
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth,provider);
        router.push("/");
    } catch (error:any) {
        toast.error(error.message);
    }
    };

    return (
              <div className='w-[90%] mx-auto h-[14vh] flex items-center justify-center'>
            <Link href={"/"}>
                <Image src="/images/logo.jpg" alt="Logo" height={90} width={90} />
            </Link>

            <div className="w-[80%] max-w-md sm:w-[50%] mx-auto mt-20">
                <h1 className="text-2xl font-bold mb-6 mt-5 text-blue-400">Welcome Back !!</h1>

                <form onSubmit={handleLogin} className="space-y-4">
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

                    

                    <button type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-800">
                        Login
                    </button>
                </form>

                <p className="mt-4 text-sm text-gray-600 text-center">
                   Not Registeres yet?{" "}
                    <Link href="/register" className="text-blue-600 hover:underline font-medium">
                        Login
                    </Link>
                </p>

                <button
                onClick={handleGoogleLogin}
                className='w-full mt-5 py-3 bg-amber-200 text-black rounded-md hover:bg-amber-800'
                >
                    Sign In With Google

                </button>
            </div>
        </div>
    );
};

export default Login;

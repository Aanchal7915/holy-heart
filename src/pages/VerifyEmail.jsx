import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VerifyEmail() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const email = params.get("email");
    const navigate = useNavigate();

    const [status, setStatus] = useState("loading"); // loading | success | error
    const [message, setMessage] = useState("");
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        async function run() {
            if (!token) {
                setStatus("error");
                setMessage("Verification token is missing. Please check your link.");
                return;
            }
            if (!email) {
                setStatus("error");
                setMessage("Email is missing. Please check your link.");
                return;
            }
            setStatus("loading");
            setMessage("");
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_BACKEND_URI}/auth/verify-email?token=${token}&email=${email}`,
                    { method: "POST" }
                );
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data?.message || `Error: ${res.status}`);
                }
                setStatus("success");
                setMessage(data?.message || "Email successfully verified!");
                toast.success(data?.message || "Your email has been verified successfully!", { position: "top-center", autoClose: 2000 });
                
            } catch (err) {
                setStatus("error");
                setMessage(err.message || "Failed to verify email");
            }
        }
        run();
    }, []);

    async function resendVerification() {
        try {
            setStatus("loading");
            setMessage("");
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URI}/auth/resend-verification`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || "Failed to resend verification");
            setStatus("success");
            setMessage("A new verification link has been sent to your email.");
            toast.success("A new verification link has been sent to your email.", { position: "top-center", autoClose: 2000 });
            setCooldown(30);
            const interval = setInterval(() => {
                setCooldown((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (err) {
            setStatus("error");
            setMessage(err.message || "Error resending verification link");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-50 px-6">
            <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center border border-green-200">
                <h2 className="text-3xl font-extrabold text-green-700 mb-4">Email Verification</h2>
                {status === "loading" && (
                    <>
                        <p className="text-green-600 mb-6 animate-pulse">Verifying your email, please wait…</p>
                        <div className="flex justify-center mb-4">
                            <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </>
                )}
                {status === "error" && (
                    <>
                        <p className="text-red-600 mb-6 font-semibold animate-pulse">{message}</p>
                        {email && (
                            <button
                                onClick={resendVerification}
                                disabled={cooldown > 0 || status === 'loading'}
                                className={`px-4 py-2 rounded-lg font-bold transition ${cooldown > 0 || status === 'loading'
                                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                        : "bg-green-600 text-white hover:bg-green-700 shadow-lg"
                                    }`}
                            >
                                {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Verification Email"}
                            </button>
                        )}
                    </>
                )}
                {status === "success" && (
                    <>
                        <p className="text-green-600 mb-6 font-semibold animate-bounce">{message || "Email verified! Redirecting to login…"}</p>
                        <div className="flex justify-center mb-4">
                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </>
                )}
            </div>
            
        </div>
    );
}

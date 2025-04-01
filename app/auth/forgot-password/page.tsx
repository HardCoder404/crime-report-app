"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function ForgotPassword() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false)
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false)
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
    const [isResettingPassword, setIsResettingPassword] = useState(false)
    const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(6).fill(null))
    const [countdown, setCountdown] = useState(30)
    const [isResendDisabled, setIsResendDisabled] = useState(true)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        setSuccess("")

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || "An error occurred while sending the OTP")
            } else {
                setSuccess("OTP sent to your email. Please check your inbox.")
                setIsOtpModalOpen(true) // Open OTP modal when OTP is sent
            }
        } catch (error) {
            setError("An error occurred. Please try again later.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return // Only allow numbers
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value !== "" && index < 5) {
            inputRefs.current[index + 1]?.focus() // Move to the next input
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus() // Move back to the previous input
        }
    }

    const handleVerifyOtp = async () => {
        const otpValue = otp.join("")
        if (otpValue.length !== 6) {
            setError("Please enter a valid 6-digit OTP")
            return
        }

        setIsVerifyingOtp(true)
        setError("")

        try {
            const response = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp: otpValue }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || "Invalid OTP. Please try again.")
            } else {
                setSuccess("OTP verified successfully")
                setIsOtpModalOpen(false)
                setIsResetPasswordModalOpen(true)
            }
        } catch (error) {
            setError("An error occurred while verifying OTP")
        } finally {
            setIsVerifyingOtp(false)
        }
    }

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters long")
            return
        }

        setIsResettingPassword(true)
        setError("")

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    otp: otp.join(""),
                    newPassword,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || "Failed to reset password")
            } else {
                setSuccess("Password reset successful")
                setTimeout(() => {
                    router.push("/auth/signin")
                }, 2000)
            }
        } catch (error) {
            setError("An error occurred while resetting password")
        } finally {
            setIsResettingPassword(false)
        }
    }

    const handleResendOtp = async () => {
        setIsLoading(true)
        setError("")
        setIsResendDisabled(true)
        setCountdown(30)

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || "Failed to resend OTP")
            } else {
                setSuccess("New OTP sent to your email")
                // Reset OTP fields
                setOtp(["", "", "", "", "", ""])
            }
        } catch (error) {
            setError("An error occurred while resending OTP")
        } finally {
            setIsLoading(false)
        }
    }


    // Timer function
    useEffect(() => {
        let timer: NodeJS.Timeout

        if (isOtpModalOpen && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prevCount) => {
                    if (prevCount <= 1) {
                        setIsResendDisabled(false)
                        clearInterval(timer)
                        return 0
                    }
                    return prevCount - 1
                })
            }, 1000)
        }

        return () => {
            if (timer) clearInterval(timer)
        }
    }, [isOtpModalOpen, countdown])

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(""); // Clear the success message after 3 seconds
            }, 5000);

            return () => clearTimeout(timer); // Cleanup the timer on component unmount or when success changes
        }
    }, [success]);

    return (
        <div
            className={`bg-black pt-40 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 ${isOtpModalOpen || isResetPasswordModalOpen ? "backdrop-blur-md" : ""}`}
        >
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">
                    Forgot Password
                </h1>
            </div>

            <div className="md:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-neutral-900/50 backdrop-blur-sm py-8 px-4 shadow-xl border border-neutral-800 rounded-xl sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-neutral-300">Email address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-neutral-800 rounded-lg bg-neutral-900 placeholder-neutral-500 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
                                placeholder="Enter your email"
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">{error}</div>
                        )}
                        {success && (
                            <div className="text-green-500 text-sm bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                                {success}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                "Send OTP"
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* OTP Modal */}
            {isOtpModalOpen && (
                <div className="fixed md:pt-40 px-5 inset-0 flex items-center justify-center z-50 bg-black/70">
                    <div className="bg-neutral-900 px-6 pt-10 pb-9 shadow-xl w-full max-w-lg sm:max-w-md md:max-w-lg rounded-2xl border border-neutral-800 relative">

                        {/* Back Button */}
                        <button
                            onClick={() => {
                                setIsOtpModalOpen(false);
                                setOtp(["", "", "", "", "", ""]);
                                setError("");
                                setSuccess("");
                                setCountdown(30);
                                setIsResendDisabled(true);
                            }}
                            className="absolute gap-1 flex items-center top-4 left-4 text-sm text-neutral-400 hover:text-neutral-200 transition"
                        >
                            <ArrowLeft size={18} /> Back
                        </button>

                        {/* Countdown Timer */}
                        <div className="absolute top-4 right-4 bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                            {countdown > 0 ? `${countdown}s` : "Resend available"}
                        </div>

                        <div className="flex mt-5 flex-col items-center justify-center text-center space-y-2">
                            <h2 className="text-3xl font-semibold text-neutral-200">Email Verification</h2>
                            <p className="text-sm text-neutral-400">We have sent a code to your email: {email}</p>
                        </div>

                        <div className="mt-6 flex justify-center space-x-3">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => {
                                        inputRefs.current[index] = el;
                                    }}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="md:w-14 w-10 h-10 md:h-14 text-center text-lg font-medium border border-neutral-700 bg-neutral-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            ))}
                        </div>

                        <div className="mt-6 flex flex-col space-y-4">
                            <button
                                onClick={handleVerifyOtp}
                                disabled={isVerifyingOtp || otp.join("").length !== 6}
                                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isVerifyingOtp ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                                ) : (
                                    "Verify Account"
                                )}
                            </button>

                            {error && (
                                <div className="mt-4 text-red-500 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                    {error}
                                </div>
                            )}

                            {/* when otp sent successfully */}
                            {success && (
                                <div className="mt-4 text-green-500 text-center text-sm bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                                    {success}
                                </div>
                            )}

                            <p className="text-sm text-neutral-400 text-center">
                                Didn’t receive code?{" "}
                                <button
                                    onClick={handleResendOtp}
                                    disabled={isLoading || isResendDisabled}
                                    className={`${isResendDisabled ? "text-blue-500/50 cursor-not-allowed" : "text-blue-500 hover:text-blue-400 cursor-pointer"} transition`}
                                >
                                    {isLoading ? "Sending..." : "Resend"}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Reset Password Modal */}
            {isResetPasswordModalOpen && (
                <div className="fixed md:pt-40 px-5 inset-0 flex items-center justify-center z-50 bg-black/70">
                    <div className="bg-neutral-900 px-6 pt-10 pb-9 shadow-xl w-full max-w-lg rounded-2xl border border-neutral-800">
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                            <h2 className="text-3xl font-semibold text-neutral-200">Reset Password</h2>
                            <p className="text-sm text-neutral-400">Create a new password for your account</p>
                        </div>

                        <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-300">New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-neutral-800 rounded-lg bg-neutral-900 placeholder-neutral-500 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
                                    placeholder="Enter new password"
                                    minLength={8}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-300">Confirm New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-neutral-800 rounded-lg bg-neutral-900 placeholder-neutral-500 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
                                    placeholder="Confirm new password"
                                    minLength={8}
                                />
                            </div>

                            {error && (
                                <div className="text-red-500 text-center text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="text-green-500 text-center text-sm bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                                    {success}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isResettingPassword || !newPassword || !confirmPassword}
                                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isResettingPassword ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                                ) : (
                                    "Reset Password"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}


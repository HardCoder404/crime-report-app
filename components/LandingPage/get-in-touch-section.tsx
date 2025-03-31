"use client"
import { Mail } from "lucide-react";
import { useState } from "react";

export default function GetInTouchSection() {
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubscribed(true);
    };

    return (
        <section className="relative overflow-hidden rounded-2xl md:p-8 sm:p-12">
            <div className="absolute inset-0 bg-zinc-900 -z-10" />
            <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Sign up for our newsletter
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-zinc-400">
                    Stay updated with the latest security features and community safety initiatives.
                </p>

                <div className="mt-8 w-full max-w-max">
                    <form className="flex w-full flex-col gap-3 sm:flex-row" onSubmit={handleSubscribe}>
                        <div className="relative flex-1">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                                required
                                disabled={isSubscribed}
                            />
                        </div>
                        <button
                            type="submit"
                            className={`rounded-xl px-6 py-2.5 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 ${isSubscribed
                                    ? "bg-gray-500 cursor-not-allowed"
                                    : "bg-sky-500 hover:bg-sky-400 focus:ring-sky-500/50"
                                }`}
                            disabled={isSubscribed}
                        >
                            {isSubscribed ? "Subscribed" : "Subscribe"}
                        </button>
                    </form>
                    <p className="mt-3 text-xs text-zinc-500">
                        By subscribing, you agree with SafeReport's <span className="text-blue-500 cursor-pointer">Terms of Service</span> and <span className="text-blue-500 cursor-pointer">Privacy Policy</span>.
                    </p>
                </div>
            </div>
        </section>
    );
}
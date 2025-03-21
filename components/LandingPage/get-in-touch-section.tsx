export default function GetInTouchSection() {
    return (
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500/20 via-blue-500/10 to-transparent p-8 sm:p-12">
            <div className="absolute inset-0 bg-zinc-900 -z-10" />
            <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Get in Touch
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-zinc-400">
                    Stay updated with the latest security features and community safety initiatives.
                </p>

                <div className="mt-8 w-full max-w-md">
                    <form className="flex w-full flex-col gap-3 sm:flex-row">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                            required
                        />
                        <button
                            type="submit"
                            className="rounded-xl bg-sky-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                        >
                            Subscribe
                        </button>
                    </form>
                    <p className="mt-3 text-xs text-zinc-500">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
    )
}

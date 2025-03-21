"use client"
import { Check } from "lucide-react"

interface PricingCardProps {
    name: string
    price: number
    period: string
    features: string[]
    featured?: boolean
}

export function PricingCard({ name, price, period, features, featured }: PricingCardProps) {
    return (
        <>
            <div className="group relative p-6 bg-zinc-900 rounded-lg border border-zinc-800 transition-all hover:bg-zinc-800/80">
                {featured && (
                    <div className="absolute -top-2 right-4 bg-white text-black px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-white">{name}</h3>
                        <div className="mt-2 flex items-baseline">
                            <span className="text-5xl font-bold tracking-tight text-white">${price}</span>
                            <span className="ml-1 text-sm font-medium text-zinc-400">/{period}</span>
                        </div>
                    </div>

                    <button className="group relative flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-sky-500 px-8 text-sm font-medium text-white transition-all hover:bg-sky-400">
                        Get {name}
                    </button>

                    <ul className="space-y-3">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-zinc-400" />
                                <span className="text-sm text-zinc-300">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </>
    )
}


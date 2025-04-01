"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Star, Award, Shield } from "lucide-react"
import Image from "next/image"

export default function TestimonialsSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: false, amount: 0.2 })
    const controls = useAnimation()

    const testimonials = [
        {
            quote:
                "This platform gave me the confidence to report suspicious activity in my neighborhood without fear of retaliation.",
            author: "Sarah Johnson",
            role: "Community Member",
            avatar: "/avtar1.webp",
            badge: "Verified User",
            badgeIcon: <Shield className="h-3 w-3" />,
        },
        {
            quote:
                "As a law enforcement officer, this tool has been invaluable. We've received critical information that would have otherwise gone unreported.",
            author: "Detective Williams",
            role: "Metropolitan Police",
            avatar: "/avtar2.webp",
            badge: "Law Enforcement",
            badgeIcon: <Award className="h-3 w-3" />,
        },
        {
            quote:
                "The encryption and security measures give me peace of mind. I was able to provide information about a serious crime while maintaining my anonymity.",
            author: "Anonymous Tipster",
            role: "Whistleblower",
            avatar: "/avtar3.jpeg",
            badge: "Protected Identity",
            badgeIcon: <Shield className="h-3 w-3" />,
        },
        {
            quote:
                "I never thought I'd have the courage to report what I witnessed, but this platform made it possible without compromising my safety.",
            author: "Michael Chen",
            role: "Concerned Citizen",
            avatar: "/avtar4.webp",
            badge: "Verified User",
            badgeIcon: <Shield className="h-3 w-3" />,
        },
        {
            quote:
                "The response time was incredible. Within hours of submitting my anonymous tip, authorities were able to take action.",
            author: "Rebecca Torres",
            role: "Community Watch",
            avatar: "/avtar2.webp",
            badge: "Top Contributor",
            badgeIcon: <Star className="h-3 w-3" />,
        },
        {
            quote:
                "Our department has solved multiple cases thanks to anonymous tips received through this platform. It's a game-changer for community safety.",
            author: "Chief Rodriguez",
            role: "Police Department",
            avatar: "/avtar4.webp",
            badge: "Law Enforcement",
            badgeIcon: <Award className="h-3 w-3" />,
        },
    ]

    useEffect(() => {
        if (isInView) {
            controls.start({
                x: [0, -1500],
                transition: {
                    x: {
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                    },
                },
            })
        }
    }, [isInView, controls])

    return (
        <div className="py-16">
            <div className="mx-auto max-w-5xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">What People Are Saying</h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Real experiences from people who have used our platform to make a difference.
                    </p>
                </div>

                <div ref={containerRef} className="relative overflow-hidden">
                    {/* Left blur gradient */}
                    <div className="absolute left-0 top-0 z-10 h-full w-32"></div>

                    {/* Right blur gradient */}
                    <div className="absolute right-0 top-0 z-10 h-full w-32"></div>

                    <div className="relative py-8">
                        <motion.div className="flex gap-6" animate={controls} initial={{ x: 0 }}>
                            {/* Duplicate testimonials for infinite scroll effect */}
                            {[...testimonials, ...testimonials].map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="group relative flex-shrink-0 w-80 overflow-hidden rounded-2xl bg-zinc-900 p-6 transition-all hover:bg-zinc-800/80"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                    <div className="relative">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="relative">
                                                <div className="h-14 w-14 overflow-hidden rounded-full bg-zinc-800">
                                                    <img
                                                        src={testimonial.avatar || "/placeholder.svg"}
                                                        alt={testimonial.author}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="absolute -bottom-1 -right-1 rounded-full bg-zinc-900 p-0.5">
                                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/20">
                                                        <Star className="h-3 w-3 text-sky-400" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-white">{testimonial.author}</h4>
                                                <p className="text-xs text-zinc-400">{testimonial.role}</p>
                                            </div>
                                        </div>

                                        <div className="mb-4 flex items-center">
                                            <div className="flex items-center gap-0.5">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star key={star} className="h-3 w-3 fill-sky-400 text-sky-400" />
                                                ))}
                                            </div>
                                        </div>

                                        <p className="mb-4 text-sm leading-relaxed text-zinc-300">
                                            &ldquo;{testimonial.quote}&rdquo;
                                        </p>

                                        <div className="flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs text-sky-400 w-fit">
                                            {testimonial.badgeIcon}
                                            {testimonial.badge}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}


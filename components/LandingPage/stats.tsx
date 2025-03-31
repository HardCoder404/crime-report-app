"use client"
import React from 'react'
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

const Stats = () => {
    const statsRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true); // Trigger animation when section is visible
                } else {
                    setIsVisible(false); // Reset animation when section goes out of view
                }
            },
            { threshold: 0.5 } // Trigger when 50% of the section is visible
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current);
            }
        };
    }, []);
    return (
        <div ref={statsRef} className="md:mt-40 rounded-2xl bg-zinc-900 p-8">
            <div className="grid gap-y-8 sm:grid-cols-3">
                {[
                    { value: 100000, label: "Reports Filed", suffix: "+" },
                    { value: 100, label: "Anonymity Rate", suffix: "%" },
                    { value: 24, label: "Support Available", suffix: "/7" },
                ].map((stat, i) => (
                    <div key={i} className="text-center">
                        <div className="text-3xl font-bold text-white">
                            {isVisible ? (
                                <CountUp
                                    start={0}
                                    end={stat.value}
                                    duration={2} // Animation duration in seconds
                                    separator=","
                                    suffix={stat.suffix}
                                />
                            ) : (
                                "0"
                            )}
                        </div>
                        <div className="mt-1 text-sm text-zinc-400">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Stats
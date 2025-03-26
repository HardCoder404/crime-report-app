"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MouseMoveEffect() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const pathname = usePathname();

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            // Ignore mouse events on elements with the "no-effect" class
            if ((event.target as HTMLElement).closest(".no-effect")) {
                return;
            }
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Do not render the effect on the /abc route
    if (pathname === "/dashboard" || pathname === "/contact" || pathname === "/submit-report") {
        return null;
    }

    return (
        <div
            className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
            style={{
                background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
            }}
        />
    );
}
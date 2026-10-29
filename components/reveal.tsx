"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
    children: ReactNode;
    className?: string;
    /** Travel distance in px. */
    y?: number;
    duration?: number;
    delay?: number;
};

/**
 * Scroll reveal that matches the motion language of the /photography,
 * /wildlife and /editing pages (y: 35-40px, 0.9s,
 * cubic-bezier(0.22, 1, 0.36, 1), fires once) without pulling framer-motion
 * onto a route that is otherwise static text and images.
 */
export default function Reveal({
    children,
    className,
    y = 36,
    duration = 900,
    delay = 0,
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const node = ref.current;

        if (!node) return;

        if (
            typeof IntersectionObserver === "undefined" ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            setShown(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;

                    setShown(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "none" : `translate3d(0, ${y}px, 0)`,
                transition: shown
                    ? `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`
                    : "none",
                willChange: shown ? "auto" : "opacity, transform",
            }}
        >
            {children}
        </div>
    );
}

"use client";
import { useEffect } from "react";

/**
 * Lightweight scroll-driven animation hook.
 * Finds all elements with `.animate-on-scroll` inside the component tree
 * and adds `.is-visible` when they enter the viewport.
 */
export function useScrollAnimation() {
    useEffect(() => {
        const elements = document.querySelectorAll<HTMLElement>(".animate-on-scroll");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        // stop observing once visible — animation only plays once
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);
}

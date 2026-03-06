"use client";

import { useEffect, useRef } from "react";

interface Snowflake {
    x: number;
    y: number;
    radius: number;
    speed: number;
    drift: number;
    opacity: number;
    twinkle: number; // phase offset for opacity shimmer
}

interface DoseSnowfallProps {
    /** Base colour for the snowflakes (hex string) */
    accentHex: string;
    /** Number of flakes (default: 60) */
    count?: number;
}

export function DoseSnowfall({ accentHex, count = 60 }: DoseSnowfallProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // Parse hex → rgb for rgba() usage
        const r = parseInt(accentHex.slice(1, 3), 16);
        const g = parseInt(accentHex.slice(3, 5), 16);
        const b = parseInt(accentHex.slice(5, 7), 16);

        const flakes: Snowflake[] = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 1.5 + Math.random() * 3,
            speed: 0.4 + Math.random() * 0.8,
            drift: (Math.random() - 0.5) * 0.4,
            opacity: 0.15 + Math.random() * 0.55,
            twinkle: Math.random() * Math.PI * 2,
        }));

        let raf: number;
        let frame = 0;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            frame++;

            for (const f of flakes) {
                // Gentle shimmer
                const alpha = f.opacity * (0.7 + 0.3 * Math.sin(f.twinkle + frame * 0.02));

                ctx.beginPath();
                ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
                ctx.fill();

                // Soft white glow core
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.radius * 0.45, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${alpha * 0.4})`;
                ctx.fill();

                // Move
                f.y += f.speed;
                f.x += f.drift + Math.sin(frame * 0.01 + f.twinkle) * 0.15;

                // Reset when off-screen
                if (f.y > height + 10) {
                    f.y = -10;
                    f.x = Math.random() * width;
                }
                if (f.x < -10) f.x = width + 10;
                if (f.x > width + 10) f.x = -10;
            }

            raf = requestAnimationFrame(draw);
        };

        draw();

        const onResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
        };
    }, [accentHex, count]);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-50"
            aria-hidden="true"
        />
    );
}

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

interface ShootingStar {
    x: number;
    y: number;
    vx: number;
    vy: number;
    len: number;
    alpha: number;
    phase: "in" | "hold" | "out";
    life: number;
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

        // ── Snow flakes ──────────────────────────────────────────
        const flakes: Snowflake[] = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 1.5 + Math.random() * 3,
            speed: 0.4 + Math.random() * 0.8,
            drift: (Math.random() - 0.5) * 0.4,
            opacity: 0.15 + Math.random() * 0.55,
            twinkle: Math.random() * Math.PI * 2,
        }));

        // ── Shooting stars ───────────────────────────────────────
        const stars: ShootingStar[] = [];
        let shootTimer: ReturnType<typeof setTimeout>;

        const spawnStar = () => {
            const sx = Math.random() * width;
            const sy = Math.random() * height * 0.6;
            const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.35;
            const spd = 8 + Math.random() * 6;
            stars.push({
                x: sx,
                y: sy,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                len: 90 + Math.random() * 80,
                alpha: 0,
                phase: "in",
                life: 80 + Math.floor(Math.random() * 30),
            });
            // Schedule the next one 3–5 s later
            shootTimer = setTimeout(spawnStar, 3000 + Math.random() * 2000);
        };

        // Kick off the first shooting star after a short initial delay
        shootTimer = setTimeout(spawnStar, 1500 + Math.random() * 1500);

        let raf: number;
        let frame = 0;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            frame++;

            // ── Draw snow ────────────────────────────────────────
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

            // ── Draw shooting stars ──────────────────────────────
            for (let i = stars.length - 1; i >= 0; i--) {
                const s = stars[i];

                if (s.phase === "in") {
                    s.alpha = Math.min(1, s.alpha + 0.08);
                    if (s.alpha >= 1) s.phase = "hold";
                } else if (s.phase === "hold") {
                    s.life--;
                    if (s.life <= 20) s.phase = "out";
                } else {
                    s.alpha = Math.max(0, s.alpha - 0.06);
                    if (s.alpha === 0) { stars.splice(i, 1); continue; }
                }

                // Tail gradient
                const tailX = s.x - (s.vx / 8) * s.len;
                const tailY = s.y - (s.vy / 8) * s.len;
                const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
                grad.addColorStop(0, `rgba(255,255,255,${s.alpha * 0.95})`);
                grad.addColorStop(0.3, `rgba(${r},${g},${b},${s.alpha * 0.6})`);
                grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(tailX, tailY);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 2;
                ctx.shadowColor = `rgba(${r},${g},${b},${s.alpha * 0.8})`;
                ctx.shadowBlur = 8;
                ctx.stroke();
                ctx.shadowBlur = 0;

                // Bright head
                ctx.beginPath();
                ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
                ctx.fill();

                s.x += s.vx;
                s.y += s.vy;
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
            clearTimeout(shootTimer);
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

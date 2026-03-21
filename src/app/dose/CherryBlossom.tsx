"use client";

import { useEffect, useRef } from "react";

interface Petal {
    x: number;
    y: number;
    size: number;       // petal "radius"
    speed: number;      // fall speed
    drift: number;      // horizontal drift
    angle: number;      // current rotation angle
    spin: number;       // rotation speed
    opacity: number;
    phase: number;      // wave offset
    colorIdx: number;   // which pink shade to use
}

// Soft pastel cherry-blossom pinks
const PETAL_COLORS = [
    "255,182,193", // light pink
    "255,160,171", // medium pink
    "255,192,203", // pink
    "252,200,218", // sakura
    "248,177,196", // blush
    "255,214,220", // very light pink
];

function drawPetal(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    angle: number,
    color: string,
    alpha: number,
) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.globalAlpha = alpha;

    // Draw a 5-petal cherry blossom shape using bezier curves
    const numPetals = 5;
    const angleStep = (Math.PI * 2) / numPetals;

    ctx.beginPath();
    for (let i = 0; i < numPetals; i++) {
        const a = i * angleStep;
        const nextA = a + angleStep;
        const midA = a + angleStep / 2;

        // Petal tip
        const tipX = Math.cos(midA) * size;
        const tipY = Math.sin(midA) * size;

        // Control points for the petal curve
        const c1X = Math.cos(a) * size * 0.7;
        const c1Y = Math.sin(a) * size * 0.7;
        const c2X = Math.cos(nextA) * size * 0.7;
        const c2Y = Math.sin(nextA) * size * 0.7;

        if (i === 0) ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(c1X, c1Y, tipX, tipY);
        ctx.quadraticCurveTo(c2X, c2Y, 0, 0);
    }

    // Fill with gradient for a 3D look
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
    grad.addColorStop(0, `rgba(255,255,255,${alpha * 0.8})`);
    grad.addColorStop(0.4, `rgba(${color},${alpha * 0.9})`);
    grad.addColorStop(1, `rgba(${color},${alpha * 0.5})`);
    ctx.fillStyle = grad;
    ctx.fill();

    // Subtle pink center dot
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(219,39,119,${alpha * 0.5})`;
    ctx.fill();

    ctx.globalAlpha = 1;
    ctx.restore();
}

interface CherryBlossomProps {
    count?: number;
}

export function CherryBlossom({ count = 35 }: CherryBlossomProps) {
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

        // Spawn petals scattered across the full screen height
        const petals: Petal[] = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: 5 + Math.random() * 8,
            speed: 0.5 + Math.random() * 0.9,
            drift: (Math.random() - 0.5) * 0.6,
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.025,
            opacity: 0.3 + Math.random() * 0.5,
            phase: Math.random() * Math.PI * 2,
            colorIdx: Math.floor(Math.random() * PETAL_COLORS.length),
        }));

        let raf: number;
        let frame = 0;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            frame++;

            for (const p of petals) {
                // Gentle opacity shimmer
                const alpha = p.opacity * (0.75 + 0.25 * Math.sin(p.phase + frame * 0.015));

                drawPetal(ctx, p.x, p.y, p.size, p.angle, PETAL_COLORS[p.colorIdx], alpha);

                // Physics
                p.y += p.speed;
                p.x += p.drift + Math.sin(frame * 0.012 + p.phase) * 0.4;
                p.angle += p.spin;

                // Reset when off-screen bottom
                if (p.y > height + p.size * 2) {
                    p.y = -p.size * 2;
                    p.x = Math.random() * width;
                }
                // Wrap horizontal
                if (p.x < -p.size * 2) p.x = width + p.size * 2;
                if (p.x > width + p.size * 2) p.x = -p.size * 2;
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
    }, [count]);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-50"
            aria-hidden="true"
        />
    );
}

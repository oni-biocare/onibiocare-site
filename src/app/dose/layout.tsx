import { DoseProvider } from "@/lib/dose/store";
import { DoseDarkMode } from "./DoseDarkMode";
import { Space_Grotesk, Space_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-dose-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dose-mono",
  display: "swap",
});

export default function DoseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <DoseProvider>
      <DoseDarkMode />
      {/* suppressHydrationWarning: DoseDarkMode forces dark theme client-side,
          which causes the global Navbar's Sun/Moon icon to differ between SSR and CSR.
          This is intentional — we suppress the warning instead of re-architecting the Navbar. */}
      <div
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${spaceMono.variable} [--dose-bg:#0D0D18] [--dose-surface:#18182A] [--dose-btn:#252540]`}
        style={{ fontFamily: "var(--font-dose-grotesk), system-ui, sans-serif" }}
      >
        <style>{`
          @keyframes dose-pulse-glow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.65; }
          }
          @keyframes dose-shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes dose-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          .dose-glow-pulse { animation: dose-pulse-glow 2.4s ease-in-out infinite; }
          .dose-shimmer-text {
            background-size: 200% auto;
            animation: dose-shimmer 3s linear infinite;
          }
          .dose-float { animation: dose-float 3s ease-in-out infinite; }
        `}</style>
        {children}
      </div>
    </DoseProvider>
  );
}

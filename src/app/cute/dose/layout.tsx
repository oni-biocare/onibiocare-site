import { DoseProvider } from "@/lib/dose/store";
import { Nunito, Quicksand } from "next/font/google";
import { CherryBlossom } from "./CherryBlossom";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-cute-nunito",
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-cute-quicksand",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export default function CuteDoseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <DoseProvider>
      <div
        className={`${nunito.variable} ${quicksand.variable}`}
        style={{
          fontFamily: "var(--font-cute-nunito), system-ui, sans-serif",
          // Force light background — override any global dark-mode
          colorScheme: "light",
        }}
      >
        <style>{`
          /* ── Hide global navigation bar on cute/dose pages ─── */
          header {
            display: none !important;
          }

          /* ── Cute theme CSS variables ──────────────────────── */
          .cute-dose-root {
            --cute-bg: #FDF8F4;
            --cute-surface: #FFFFFF;
            --cute-muted: #F4EEE8;
            --cute-text: #2D2D2D;
            --cute-text-muted: #9CA3AF;
            --cute-radius: 20px;
          }

          /* ── Dopamine (pink) ──────────────────────────────── */
          :root {
            --cute-dopamine: #F9A8D4;
            --cute-dopamine-bg: #FCE7F3;
            --cute-dopamine-dark: #DB2777;
            --cute-oxytocin: #FDBA74;
            --cute-oxytocin-bg: #FEF3C7;
            --cute-oxytocin-dark: #D97706;
            --cute-serotonin: #6EE7B7;
            --cute-serotonin-bg: #D1FAE5;
            --cute-serotonin-dark: #059669;
            --cute-endorphins: #C4B5FD;
            --cute-endorphins-bg: #EDE9FE;
            --cute-endorphins-dark: #7C3AED;
          }

          /* ── Animations ───────────────────────────────────── */
          @keyframes cute-float {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-6px); }
          }
          @keyframes cute-pop {
            0%   { transform: scale(1); }
            40%  { transform: scale(1.06); }
            100% { transform: scale(1); }
          }
          @keyframes cute-sparkle {
            0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
            50%       { opacity: 1;   transform: scale(1.2) rotate(15deg); }
          }
          @keyframes cute-blob-drift {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33%       { transform: translate(8px, -12px) scale(1.04); }
            66%       { transform: translate(-6px, 8px) scale(0.97); }
          }

          .cute-float     { animation: cute-float     3.5s ease-in-out infinite; }
          .cute-pop       { animation: cute-pop        0.3s ease-out; }
          .cute-sparkle   { animation: cute-sparkle    2.4s ease-in-out infinite; }
          .cute-blob-drift{ animation: cute-blob-drift 8s   ease-in-out infinite; }

          /* ── Selection card pop ───────────────────────────── */
          .cute-option-btn {
            transition: all 0.18s ease;
          }
          .cute-option-btn:active {
            transform: scale(0.97);
          }
        `}</style>
        <div className="cute-dose-root" style={{ background: "var(--cute-bg)", minHeight: "100vh" }}>
          {/* ── Fixed pastel blob background — shared across all pages ── */}
          <div
            className="cute-blob-drift pointer-events-none fixed -left-20 -top-20 h-72 w-72 rounded-full opacity-50"
            style={{ background: "radial-gradient(circle, #FBCFE8 0%, transparent 70%)", filter: "blur(48px)", zIndex: 0 }}
          />
          <div
            className="cute-blob-drift pointer-events-none fixed -bottom-20 -right-20 h-80 w-80 rounded-full opacity-40"
            style={{ background: "radial-gradient(circle, #DDD6FE 0%, transparent 70%)", filter: "blur(56px)", zIndex: 0, animationDelay: "2.5s" }}
          />
          <div
            className="cute-blob-drift pointer-events-none fixed bottom-1/3 -left-10 h-56 w-56 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #A7F3D0 0%, transparent 70%)", filter: "blur(40px)", zIndex: 0, animationDelay: "1.2s" }}
          />
          <CherryBlossom count={40} />
          {children}
        </div>
      </div>
    </DoseProvider>
  );
}

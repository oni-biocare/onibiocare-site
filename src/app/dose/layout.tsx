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
      <div
        className={`${spaceGrotesk.variable} ${spaceMono.variable} [--dose-bg:#0F0F14] [--dose-surface:#1C1C26] [--dose-btn:#2A2A38]`}
        style={{ fontFamily: "var(--font-dose-grotesk), system-ui, sans-serif" }}
      >
        {children}
      </div>
    </DoseProvider>
  );
}

import { DoseProvider } from "@/lib/dose/store";

export default function DoseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <DoseProvider>{children}</DoseProvider>;
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.siteUrl || 'https://onibiocare.com'),
  title: {
    default: process.env.siteName || 'Oni Biocare',
    template: `%s | ${process.env.siteName || 'Oni Biocare'}`,
  },
  description: process.env.siteDescription || 'Sản phẩm chăm sóc sức khỏe chất lượng',
  keywords: ['sức khỏe', 'chăm sóc sức khỏe', 'biocare', 'sản phẩm y tế'],
  authors: [{ name: 'Oni Biocare Team' }],
  creator: 'Oni Biocare',
  publisher: 'Oni Biocare',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: process.env.locale || 'vi_VN',
    url: process.env.siteUrl || 'https://onibiocare.com',
    title: process.env.siteName || 'Oni Biocare',
    description: process.env.siteDescription || 'Sản phẩm chăm sóc sức khỏe chất lượng',
    siteName: process.env.siteName || 'Oni Biocare',
  },
  twitter: {
    card: 'summary_large_image',
    title: process.env.siteName || 'Oni Biocare',
    description: process.env.siteDescription || 'Sản phẩm chăm sóc sức khỏe chất lượng',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://onibiocare.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={process.env.locale?.split('_')[0] || 'vi'} suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

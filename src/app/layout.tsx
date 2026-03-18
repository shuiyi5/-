import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CursorTrail } from "@/components/ui/CursorTrail";
import { FallingPetals } from "@/components/ui/FallingPetals";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sentoe - AI Product Blog",
    template: "%s | Sentoe",
  },
  description:
    "Exploring the frontier of AI products, documenting thoughts from zero to one.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getTheme() {
                  var stored = document.cookie.match(/theme=(light|dark)/);
                  if (stored) return stored[1];
                  return 'dark';
                }
                var theme = getTheme();
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="noise min-h-screen bg-[var(--bg)] text-[var(--text-primary)] antialiased font-sans">
        <CursorTrail />
        <FallingPetals count={45} />
        {children}
      </body>
    </html>
  );
}

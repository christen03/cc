import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Indie, CaveatFont } from "@/components/fonts";
import FlyingTransition from "../components/FlyingTransition";
import GlobalMusic from "../components/GlobalMusic";

export const metadata: Metadata = {
  title: "A little question… 💌",
  description: "A cute little site with a big question.",
  openGraph: {
    title: "A little question… 💌",
    description: "Tap to begin.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const viewport: Viewport = {
  themeColor: "#ff7aa2",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={CaveatFont.variable}>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)] antialiased">
        {/* safe-area padding for notches */}
        <div className="px-4 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
          {children}
        </div>
        <FlyingTransition />
        <GlobalMusic />
      </body>
    </html>
  );
}

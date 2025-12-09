import { Press_Start_2P, VT323, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const pressStart2P = Press_Start_2P({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-press-start-2p",
    display: "swap",
});

const vt323 = VT323({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-vt323",
    display: "swap",
});

export const metadata = {
    title: "Pixel UI Starter",
    description: "A retro-modern pixel art UI starter kit",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${pressStart2P.variable} ${vt323.variable}`}>
            <body className="bg-[var(--px-soft)] text-[var(--px-black)] min-h-screen">
                {children}
            </body>
        </html>
    );
}

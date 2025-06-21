import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "../styles/main.scss";
import AnimatedPageWrapper from "@/components/Misc/AnimatedPageWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"], // choose the weights you need
  variable: "--font-roboto", // optional
});

export const metadata: Metadata = {
  title: "Movie Collection",
  description: "Movie Collection App using Next.js and TypeScript",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}
      >
        <AnimatedPageWrapper>{children}</AnimatedPageWrapper>
      </body>
    </html>
  );
}

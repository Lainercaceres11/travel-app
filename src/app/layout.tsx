import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "../components";
import { auth } from "@/auth";

import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travel app",
  description:
    "Travel App es tu compañero de viaje ideal: descubre destinos únicos, organiza tus itinerarios y accede a recomendaciones personalizadas para que cada experiencia sea inolvidable.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar session={session} />
        {children}
      </body>
    </html>
  );
}

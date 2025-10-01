import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/common/Header";
import { AuthProvider } from "@/hook/use-auth";
import { Toaster } from "@/components/ui/sonner";
import Provider from "./Provider";
import { Suspense } from "react";
import { Fallback } from "@/components/common/Fallback";
import React from "react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Library",
  description: "Rate and discover amazing movies",
  generator: "Next.js",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<Fallback />}>
          <Provider>
            <AuthProvider>
              <Header />
              <main className="flex flex-col items-center w-full h-full max-h-screen py-10">
                {children}
              </main>
              <Toaster richColors position="bottom-right" closeButton />
            </AuthProvider>
          </Provider>
        </Suspense>
      </body>
    </html>
  );
}

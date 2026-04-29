import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "叽哩叽哩 (゜-゜)つロ 干杯~-jilijili",
  description: "Social media app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="w-full bg-white px-4 md:px-8 lg:px-32 xl:px-32 2xl:px-64">
            <Navbar />
          </div>
          <div className=" bg-slate-100 px-4 md:px-8 lg:px-32 xl:px-32 2xl:px-64">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
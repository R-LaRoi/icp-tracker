'use client'
// import type { Metadata } from 'next'
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from 'next-auth/react'


const inter = Inter({ subsets: ["latin"] });

// export const Metadata = {
//   title: "Career Plan",
//   description: "Define your path today.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {children}
        </SessionProvider>


      </body>
    </html>
  );
}

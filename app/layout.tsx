import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import {Toaster} from "sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Page Navigator",
  description: "Discover, Track, and Share Your Literary Journey",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()

  return (
    <SessionProvider session={session}>

    <html lang="en">

      <body className={inter.className}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
    </SessionProvider>
  );
}

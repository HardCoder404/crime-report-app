import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";
import NextTopLoader from 'nextjs-toploader';

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import MouseMoveEffect from "@/components/mouse-move-effect";
import ChatBot from "@/components/chat-bot";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "SafeReport - Anonymous Crime Reporting",
  description: "Securely and anonymously report crimes to law enforcement",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authOptions);
  const userRole = session?.user?.role;

  console.log("Logged-in User Role:", userRole);

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader height={3} showSpinner={false} />
        <div className="relative min-h-screen bg-black selection:bg-sky-500/20">

          {/* Gradient Background (Limited to Hero Section) */}
          <div className="absolute top-0 left-0 w-full h-[700px]">
            <div className="absolute inset-0 h-full w-full bg-black before:absolute before:inset-0 before:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] before:bg-[size:40px_40px]"></div>

            {/* Smooth blending gradient */}
            <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent to-black"></div>
          </div>

          {
            userRole !== "ADMIN" ?
              <Navbar /> : <></>
          }
          <main className={`${userRole === "ADMIN" ? "pt-0" : "pt-16"}`}>
            <Providers>
              <MouseMoveEffect />
              {children}
            </Providers>
          </main>
          {userRole !== "ADMIN" && <ChatBot />}
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";
import NextTopLoader from 'nextjs-toploader';

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
          {/* Gradient Background */}
          <div className="fixed inset-0 -z-10 min-h-screen">
            <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03),transparent_50%)]" />
            <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.04),transparent_70%)]" />
          </div>
          {
            userRole !== "ADMIN" ?
          <Navbar />:<></>
          }
          <main className={`${userRole === "ADMIN" ? "pt-0" : "pt-16"}`}>
            <Providers>{children}</Providers>
          </main>
        </div>
      </body>
    </html>
  );
}

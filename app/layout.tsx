import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UT PFDE/PM",
  description: "UT PFDE/PM",
};

interface pageI {
  children: React.ReactNode;
}

function RootLayout({children}: pageI) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-full h-screen flex">
          <div className="sidebar w-[17%] h-full  bg-[rgb(240,240,240)] border-r border-r-[rgb(229,229,229)]">
            <Link href="./" className="header flex px-4 items-center h-[5%] w-full border-b border-b-[rgb(229,229,229)]">
              <Header />
            </Link>
            <div className="navigator flex flex-col h-[95%] w-full p-4 gap-4">
              <Sidebar />
            </div>
          </div>
          <div className="body w-full h-full">
            <div className="main-body w-full h-full">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;

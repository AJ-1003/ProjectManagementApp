import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "@/components/dashboard-wrapper";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "NxtGen WebWorks PM",
  description: "Project Management App Developed by NxtGen WebWorks",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DashboardWrapper>
          {children}
        </DashboardWrapper>
      </body>
    </html>
  );
}

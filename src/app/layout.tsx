import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase.server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Urban Trend Admin Portal",
  description: "Admin portal for Urban Trend ecommerce site",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentUser } = await getAuthenticatedAppForUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar initialUser={currentUser?.toJSON()}></Navbar>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: {
    template: "%s | Dev Shop",
    default: "DevShop",
  },
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inter.variable} lang="pt-BR">
      <body className="bg-zinc-950 text-zinc-50">{children}</body>
    </html>
  );
}

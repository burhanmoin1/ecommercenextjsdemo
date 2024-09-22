import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import {Inria_Sans, Inter, DM_Sans, } from "next/font/google";
import { StoreProvider } from "./redux/StoreProvider";

const Inria = DM_Sans({
  weight: ["400", '600', '700'],
  subsets: ["latin"],
});


const inter = Inter({
  weight: ["400", '700'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
      <body
        className={Inria.className}
      >
        {children}
      </body>
      </StoreProvider>
    </html>
  );
}

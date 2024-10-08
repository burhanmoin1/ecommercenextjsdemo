import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans, } from "next/font/google";
import { StoreProvider } from "./redux/StoreProvider";

const dmsans = DM_Sans({
  weight: ["400", '600', '700'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wizardy Labs Ecommerce Demo",
  description: "Ecommerce Demo product by Burhan Moin",
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
        className={dmsans.className}
      >
        {children}
      </body>
      </StoreProvider>
    </html>
  );
}

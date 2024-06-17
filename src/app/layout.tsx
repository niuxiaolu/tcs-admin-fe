import type { Metadata } from "next";
import { PrimeReactProvider } from "primereact/api";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Nav } from "@/components/Nav";
import "./globals.scss";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trading Capturing System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrimeReactProvider>
          <Header />
          <div className="main-container">
            <Nav />
            <div className="main-right">{children}</div>
          </div>
        </PrimeReactProvider>
      </body>
    </html>
  );
}

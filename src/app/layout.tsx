import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import NavBar from "./components/NavBar.jsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TANTO WIN",
  description: "TantoWin Base",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <link rel="icon" href="/favicon.png" />
      <body className="overflow-y-scroll max-w-[100vw]">
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

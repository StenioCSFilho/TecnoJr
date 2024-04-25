import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair_Display = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My To Do List",
  description: "Aplicação de gerenciamento de notas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={playfair_Display.className}>{children}</body>
    </html>
  );
}

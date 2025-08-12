import type { Metadata } from "next";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "./globals.scss";
import { robotoCondensed } from './font';

export const metadata: Metadata = {
  title: "Skybound Studio",
  description: "Agence de developement web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
        <body className={robotoCondensed.className}>
            <Header />
            {children}
            <Footer />
        </body>
    </html>
  );
}

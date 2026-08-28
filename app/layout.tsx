import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://creamos.digital"),
  title: {
    default: "Gastón García | Consultor digital y AI-forward developer",
    template: "%s | Creamos Digital",
  },
  description:
    "Gastón García ayuda a empresas a evaluar, dirigir y desarrollar proyectos digitales, integrando inteligencia artificial cuando aporta valor. Costa Rica y Latinoamérica.",
  authors: [{ name: "Gastón García", url: "https://creamos.digital/" }],
  creator: "Gastón García",
  openGraph: {
    type: "website",
    locale: "es_CR",
    siteName: "Creamos Digital",
    title: "Gastón García | Consultor digital y AI-forward developer",
    description:
      "Consultoría digital, dirección de productos y AI-forward development desde Costa Rica para Latinoamérica.",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "Gastón García | Consultor digital y AI-forward developer",
    description:
      "Consultoría digital, dirección de productos y AI-forward development desde Costa Rica para Latinoamérica.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${spaceGrotesk.variable} antialiased`}>{children}</body>
    </html>
  );
}

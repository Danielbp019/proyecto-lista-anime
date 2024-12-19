import type { Metadata } from 'next';
import { Roboto, Nunito } from 'next/font/google';
import './globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'Lista anime',
  description: 'Hecho con Next.js 15 y asistido con IA.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="dark">
      <body className={`${roboto.variable} ${nunito.variable} antialiased`}>{children}</body>
    </html>
  );
}

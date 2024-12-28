// layout.jsx
import { Roboto } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/app/styles/globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "Lista anime",
  description: "Hecho con Next.js 15 y asistido con IA.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-theme="">
      <body className={`${roboto.variable} antialiased`}>{children}</body>
    </html>
  );
}

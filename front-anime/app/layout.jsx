// layout.jsx
import { Roboto, Alex_Brush } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/app/styles/globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const alexBrush = Alex_Brush({
  variable: "--font-AlexBrush",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Tu lista ocio",
  description: "Hecho con Next.js 15 y asistido con IA.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-theme="">
      <body className={`${roboto.variable} ${alexBrush.variable} antialiased`}>{children}</body>
    </html>
  );
}

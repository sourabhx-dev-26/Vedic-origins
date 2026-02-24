import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Vedic Origins | Premium A2 Ghee & Natural Products",
  description: "Pure. Authentic. Traditional. Vedic Origins brings you the finest A2 ghee and natural products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cream min-h-screen font-sans">
        <AuthProvider>
          <Header />
          <main className="pt-16">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}

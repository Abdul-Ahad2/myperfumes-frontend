import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home | MyPerfumes",
  description: "Landing Page",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700"
    >
      <body className={inter.className}>
        <Toaster position="bottom-right" expand={true} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

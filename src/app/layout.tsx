import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "野球場空き状況チェッカー",
  description: "簡単に野球場の空き状況を確認できるアプリケーション",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://tool.saka2931.jp"),
  title: { default: "Saka Tools | saka2931.jp", template: "%s | Saka Tools" },
  description: "登録不要・無料で使えるシンプルなWebツール集",
  applicationName: "Saka Tools",
  openGraph: { siteName: "Saka Tools", locale: "ja_JP", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="flex min-h-screen flex-col antialiased">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Saka Tools", template: "%s | Saka Tools" },
  description: "登録不要・無料で使えるシンプルなWebツール集",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-bold">🛠 Saka Tools</Link>
            <a href="https://game.saka2931.jp" className="text-sm text-slate-500 hover:text-slate-900">ゲームはこちら →</a>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-6 py-8">{children}</main>
        <footer className="mx-auto max-w-4xl px-6 py-8 text-sm text-slate-500">
          入力内容はブラウザ内で処理され、サーバーには送信されません。
        </footer>
      </body>
    </html>
  );
}

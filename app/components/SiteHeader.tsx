import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-bold text-gray-900">
          tool.saka2931.jp
        </Link>
        <nav className="flex items-center gap-5 text-sm text-gray-600">
          <a href="https://saka2931.jp" className="hover:text-gray-900">
            運営者情報
          </a>
          <a href="https://game.saka2931.jp" className="hover:text-gray-900">
            ゲーム
          </a>
        </nav>
      </div>
    </header>
  );
}

const LINKS = [
  { href: "https://saka2931.jp/privacy", label: "プライバシーポリシー" },
  { href: "https://saka2931.jp/terms", label: "利用規約" },
  { href: "https://saka2931.jp/disclaimer", label: "免責事項" },
  { href: "https://saka2931.jp/cookie", label: "クッキーポリシー" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-gray-200 py-8 text-center text-xs text-gray-500">
      <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="hover:text-gray-600">
            {l.label}
          </a>
        ))}
      </nav>
      <p className="mt-3">tool.saka2931.jp</p>
    </footer>
  );
}

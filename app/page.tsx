import Link from "next/link";
import { pageMetadata } from "./lib/seo";
import { tools } from "./tools";

export const metadata = pageMetadata({ title: "ツール一覧", description: "登録不要・無料で使えるシンプルなWebツール集。入力内容はサーバーに送信されません。", path: "/" });

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold text-gray-900">Saka Tools</h1>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">
        登録不要・無料で使えるシンプルなWebツール集です。入力した内容はブラウザ内で処理され、サーバーには送信されません。
      </p>
      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">ツール一覧</h2>
        <div className="mt-3 space-y-3">
          {tools.map((t) => (
            <Link key={t.slug} href={`/${t.slug}`} className="block rounded-lg border border-gray-200 bg-white p-4 transition hover:border-gray-300 hover:shadow-xs">
              <p className="font-medium text-gray-900">{t.name}</p>
              <p className="mt-1 text-sm text-gray-500">{t.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

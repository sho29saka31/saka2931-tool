import Link from "next/link";
import { tools } from "./tools";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold">Saka Tools</h1>
      <p className="mt-2 text-slate-600">登録不要・無料で使える、小さくて便利なツール集です。</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {tools.map((t) => (
          <Link key={t.slug} href={`/${t.slug}`} className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-400 hover:shadow">
            <div className="text-2xl">{t.icon}</div>
            <h2 className="mt-2 font-semibold">{t.name}</h2>
            <p className="mt-1 text-sm text-slate-600">{t.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

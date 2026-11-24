import Link from "next/link";
import { tools } from "../tools";

export function ToolShell({ slug, children }: { slug: string; children: React.ReactNode }) {
  const t = tools.find((x) => x.slug === slug)!;
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">← ツール一覧</Link>
      <h1 className="mt-3 text-2xl font-bold text-gray-900">{t.name}</h1>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">{t.description}</p>
      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-5">{children}</div>
    </main>
  );
}

export const btn = "rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50";
export const btnSub = "rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50";
export const input = "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900";

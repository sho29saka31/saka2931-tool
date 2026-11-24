import Link from "next/link";
import { tools } from "../tools";

export function ToolShell({ slug, children }: { slug: string; children: React.ReactNode }) {
  const t = tools.find((x) => x.slug === slug)!;
  return (
    <>
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-900">← ツール一覧</Link>
      <h1 className="mt-2 text-2xl font-bold">{t.icon} {t.name}</h1>
      <p className="mt-1 text-slate-600">{t.description}</p>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">{children}</div>
    </>
  );
}

export const btn = "rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700";
export const btnSub = "rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100";
export const input = "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm";

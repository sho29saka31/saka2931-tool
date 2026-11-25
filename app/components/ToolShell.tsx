import Link from "next/link";
import { categories, tools } from "../tools";
import { itemJsonLd } from "../lib/seo";

export function ToolShell({ slug, children }: { slug: string; children: React.ReactNode }) {
  const t = tools.find((x) => x.slug === slug)!;
  const cat = categories.find((c) => c.id === t.category)!;
  const siblings = tools.filter((x) => x.category === t.category && x.slug !== slug);
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemJsonLd(t, "UtilitiesApplication")) }} />
      <nav className="font-mono text-xs text-gray-500">
        <Link href="/" className="hover:text-accent">tool</Link> / {cat.name}
      </nav>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900">{t.name}</h1>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{t.description}</p>
      <div className="mt-8 border-t border-gray-900 pt-6">{children}</div>
      {siblings.length > 0 && (
        <aside className="mt-16 border-t border-gray-200 pt-4">
          <h2 className="text-xs font-semibold text-gray-500">{cat.name}の他のツール</h2>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {siblings.map((s) => <li key={s.slug}><Link href={`/${s.slug}`} className="text-gray-700 hover:text-accent">{s.name}</Link></li>)}
          </ul>
        </aside>
      )}
    </main>
  );
}

export const btn = "rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90 disabled:opacity-50";
export const btnSub = "rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50";
export const input = "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

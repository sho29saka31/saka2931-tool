"use client";
import Link from "next/link";
import { useState } from "react";

type Item = { slug: string; name: string; description: string; category: string };
type Category = { id: string; name: string };

/** カテゴリごとに見出しを付けて並べ、タブで1カテゴリずつ絞り込める一覧。 */
export function Catalog({ items, categories }: { items: Item[]; categories: Category[] }) {
  const [active, setActive] = useState("all");
  const order = categories.flatMap((c) => items.filter((i) => i.category === c.id));
  const no = (slug: string) => String(order.findIndex((i) => i.slug === slug) + 1).padStart(2, "0");
  const tab = (id: string, label: string, count: number) => (
    <button
      key={id}
      aria-pressed={active === id}
      onClick={() => setActive(id)}
      className={`border-b-2 px-1 pb-1 text-sm ${active === id ? "border-accent font-bold text-accent" : "border-transparent text-gray-500 hover:text-gray-900"}`}
    >
      {label} <span className="font-mono text-xs">{count}</span>
    </button>
  );
  return (
    <>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {tab("all", "すべて", items.length)}
        {categories.map((c) => tab(c.id, c.name, items.filter((i) => i.category === c.id).length))}
      </div>
      <div className="mt-8 space-y-10">
        {categories.filter((c) => active === "all" || c.id === active).map((c) => (
          <section key={c.id}>
            <h2 className="border-b border-gray-900 pb-2 text-sm font-bold text-gray-900">{c.name}</h2>
            <ul>
              {items.filter((i) => i.category === c.id).map((i) => (
                <li key={i.slug} className="border-b border-gray-200">
                  <Link href={`/${i.slug}`} className="group flex items-baseline gap-4 py-3 hover:bg-gray-100/70">
                    <span className="w-6 shrink-0 font-mono text-xs text-gray-400">{no(i.slug)}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-gray-900 group-hover:text-accent">{i.name}</span>
                      <span className="mt-0.5 block text-sm text-gray-500">{i.description}</span>
                    </span>
                    <span aria-hidden className="text-gray-300 group-hover:text-accent">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}

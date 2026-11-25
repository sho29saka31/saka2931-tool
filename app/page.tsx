import { pageMetadata } from "./lib/seo";
import { Catalog } from "./components/Catalog";
import { categories, tools } from "./tools";

export const metadata = pageMetadata({ title: "tool - 無料のWebツール集", description: "日常のちょっとした作業に使う道具をまとめています。入力した内容は、お使いのブラウザの中だけで処理されます。", path: "/" });

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <p className="font-mono text-xs text-accent">tool.saka2931.jp</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">tool</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600">日常のちょっとした作業に使う道具をまとめています。入力した内容は、お使いのブラウザの中だけで処理されます。</p>
      <div className="mt-10">
        <Catalog items={tools} categories={categories} />
      </div>
    </main>
  );
}

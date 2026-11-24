"use client";
import { useState } from "react";
import { input } from "../components/ToolShell";

export default function Client() {
  const [text, setText] = useState("");
  const chars = [...text].length;
  const noSpace = [...text.replace(/\s/g, "")].length;
  const lines = text === "" ? 0 : text.split("\n").length;
  const bytes = new TextEncoder().encode(text).length;
  const pages = (chars / 400).toFixed(2);
  const stats = [["文字数", chars], ["空白除く", noSpace], ["行数", lines], ["バイト(UTF-8)", bytes], ["原稿用紙(400字)", `${pages}枚`]];
  return (
    <>
      <textarea className={`${input} h-56`} value={text} onChange={(e) => setText(e.target.value)} placeholder="ここにテキストを入力・貼り付け" />
      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {stats.map(([k, v]) => (
          <div key={k} className="rounded-lg bg-gray-100 p-3 text-center">
            <dt className="text-xs text-gray-500">{k}</dt>
            <dd className="text-lg font-bold">{v}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

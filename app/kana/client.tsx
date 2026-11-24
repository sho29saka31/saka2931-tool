"use client";
import { useState } from "react";
import { btnSub, input } from "../components/ToolShell";

const shift = (s: string, re: RegExp, d: number) => s.replace(re, (c) => String.fromCharCode(c.charCodeAt(0) + d));
const ACTIONS: [string, (s: string) => string][] = [
  ["全角英数 → 半角", (s) => shift(s, /[Ａ-Ｚａ-ｚ０-９]/g, -0xfee0).replace(/　/g, " ")],
  ["半角英数 → 全角", (s) => shift(s, /[A-Za-z0-9]/g, 0xfee0).replace(/ /g, "　")],
  ["ひらがな → カタカナ", (s) => shift(s, /[ぁ-ゖ]/g, 0x60)],
  ["カタカナ → ひらがな", (s) => shift(s, /[ァ-ヶ]/g, -0x60)],
  ["大文字に", (s) => s.toUpperCase()],
  ["小文字に", (s) => s.toLowerCase()],
  ["前後の空白を削除", (s) => s.split("\n").map((l) => l.trim()).join("\n")],
];

export default function Client() {
  const [text, setText] = useState("");
  return (
    <div className="space-y-3">
      <textarea className={`${input} h-48`} value={text} onChange={(e) => setText(e.target.value)} placeholder="変換したいテキスト" />
      <div className="flex flex-wrap gap-2">
        {ACTIONS.map(([label, fn]) => <button key={label} className={btnSub} onClick={() => setText(fn(text))}>{label}</button>)}
      </div>
      <p className="text-xs text-gray-500">ボタンを押すと、入力欄の内容がその場で変換されます。</p>
    </div>
  );
}

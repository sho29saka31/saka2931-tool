"use client";
import { useState } from "react";
import { btn, input } from "../components/ToolShell";

function rnd(max: number) {
  const limit = Math.floor(0x100000000 / max) * max;
  const b = new Uint32Array(1);
  do crypto.getRandomValues(b); while (b[0] >= limit);
  return b[0] % max;
}

export default function Client() {
  const [list, setList] = useState("");
  const [picked, setPicked] = useState("");
  const [sides, setSides] = useState(6);
  const [count, setCount] = useState(2);
  const [dice, setDice] = useState<number[]>([]);
  const items = list.split("\n").map((s) => s.trim()).filter(Boolean);
  const draw = () => items.length && setPicked(items[rnd(items.length)]);
  const shuffle = () => {
    const a = [...items];
    for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; }
    setPicked(a.map((x, i) => `${i + 1}. ${x}`).join("\n"));
  };
  const roll = () => setDice(Array.from({ length: Math.min(Math.max(count, 1), 20) }, () => rnd(Math.max(sides, 2)) + 1));
  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h2 className="font-semibold">くじ引き・並び替え</h2>
        <textarea className={`${input} h-28`} value={list} onChange={(e) => setList(e.target.value)} placeholder={"1行に1項目ずつ入力\n例:\nラーメン\nカレー\n寿司"} />
        <div className="flex gap-2">
          <button className={btn} onClick={draw} disabled={!items.length}>1つ選ぶ</button>
          <button className={btn} onClick={shuffle} disabled={!items.length}>並び替える</button>
        </div>
        {picked && <pre className="whitespace-pre-wrap rounded-md bg-gray-100 p-3 text-lg font-bold">{picked}</pre>}
      </section>
      <section className="space-y-2">
        <h2 className="font-semibold">サイコロ</h2>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <input type="number" min={2} className={`${input} w-24`} value={sides} onChange={(e) => setSides(+e.target.value)} /> 面 ×
          <input type="number" min={1} max={20} className={`${input} w-24`} value={count} onChange={(e) => setCount(+e.target.value)} /> 個
          <button className={btn} onClick={roll}>振る</button>
        </div>
        {dice.length > 0 && <p className="text-lg">出目: <b>{dice.join(", ")}</b>(合計 <b>{dice.reduce((a, b) => a + b, 0)}</b>)</p>}
      </section>
    </div>
  );
}

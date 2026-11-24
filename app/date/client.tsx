"use client";
import { useState } from "react";
import { input } from "../components/ToolShell";

const DAY = 86400000;
const toUtc = (s: string) => { const [y, m, d] = s.split("-").map(Number); return Date.UTC(y, m - 1, d); };
const fmt = (t: number) => new Date(t).toISOString().slice(0, 10);

export default function Client() {
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const [a, setA] = useState(today);
  const [b, setB] = useState(today);
  const [base, setBase] = useState(today);
  const [n, setN] = useState(30);
  const diff = a && b ? Math.round((toUtc(b) - toUtc(a)) / DAY) : null;
  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h2 className="font-semibold">日付の差</h2>
        <div className="flex flex-wrap items-center gap-2">
          <input type="date" className={`${input} w-auto`} value={a} onChange={(e) => setA(e.target.value)} />
          <span>→</span>
          <input type="date" className={`${input} w-auto`} value={b} onChange={(e) => setB(e.target.value)} />
        </div>
        {diff !== null && <p className="text-lg">差は <b>{Math.abs(diff)}</b> 日{diff < 0 && "(逆順)"}</p>}
      </section>
      <section className="space-y-2">
        <h2 className="font-semibold">日数の加減算</h2>
        <div className="flex flex-wrap items-center gap-2">
          <input type="date" className={`${input} w-auto`} value={base} onChange={(e) => setBase(e.target.value)} />
          <input type="number" className={`${input} w-28`} value={n} onChange={(e) => setN(+e.target.value)} />
          <span>日後(マイナスで前)</span>
        </div>
        {base && <p className="text-lg">結果: <b>{fmt(toUtc(base) + n * DAY)}</b></p>}
      </section>
    </div>
  );
}

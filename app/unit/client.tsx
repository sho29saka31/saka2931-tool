"use client";
import { useState } from "react";
import { input } from "../components/ToolShell";

type Cat = { name: string; units: Record<string, number> }; // 基準単位に対する倍率
const CATS: Cat[] = [
  { name: "長さ", units: { "mm": 0.001, "cm": 0.01, "m": 1, "km": 1000, "inch": 0.0254, "ft": 0.3048, "yard": 0.9144, "mile": 1609.344 } },
  { name: "重さ", units: { "mg": 0.000001, "g": 0.001, "kg": 1, "t": 1000, "oz": 0.028349523125, "lb": 0.45359237 } },
  { name: "面積", units: { "㎡": 1, "㎢": 1e6, "ha": 1e4, "a": 100, "坪": 400 / 121, "畳": 1.62, "acre": 4046.8564224 } },
  { name: "容量", units: { "mL": 0.001, "L": 1, "㎥": 1000, "合": 0.18039, "升": 1.8039, "gal(US)": 3.785411784, "cup(US)": 0.2365882365 } },
  { name: "速度", units: { "m/s": 1, "km/h": 1 / 3.6, "mph": 0.44704, "knot": 0.514444 } },
  { name: "温度", units: { "℃": 1, "℉": 1, "K": 1 } },
];

function temp(v: number, from: string, to: string) {
  const c = from === "℃" ? v : from === "℉" ? ((v - 32) * 5) / 9 : v - 273.15;
  return to === "℃" ? c : to === "℉" ? (c * 9) / 5 + 32 : c + 273.15;
}

export default function Client() {
  const [ci, setCi] = useState(0);
  const cat = CATS[ci];
  const names = Object.keys(cat.units);
  const [from, setFrom] = useState(names[0]);
  const [to, setTo] = useState(names[1]);
  const [value, setValue] = useState("1");
  const v = Number(value);
  const ok = value.trim() !== "" && Number.isFinite(v);
  const out = !ok ? null : cat.name === "温度" ? temp(v, from, to) : (v * cat.units[from]) / cat.units[to];
  const pick = (i: number) => { const n = Object.keys(CATS[i].units); setCi(i); setFrom(n[0]); setTo(n[1]); };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 text-sm">
        {CATS.map((c, i) => (
          <button key={c.name} onClick={() => pick(i)} className={`rounded-md border px-3 py-1 ${i === ci ? "border-accent bg-accent text-white" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"}`}>{c.name}</button>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="flex gap-2">
          <input className={input} inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} />
          <select className={`${input} w-28`} value={from} onChange={(e) => setFrom(e.target.value)}>{names.map((n) => <option key={n}>{n}</option>)}</select>
        </div>
        <span className="text-center text-gray-500">=</span>
        <div className="flex gap-2">
          <input readOnly className={`${input} bg-gray-50`} value={out === null ? "" : String(Number(out.toPrecision(10)))} />
          <select className={`${input} w-28`} value={to} onChange={(e) => setTo(e.target.value)}>{names.map((n) => <option key={n}>{n}</option>)}</select>
        </div>
      </div>
      {!ok && <p className="text-sm text-red-600">数値を入力してください。</p>}
    </div>
  );
}

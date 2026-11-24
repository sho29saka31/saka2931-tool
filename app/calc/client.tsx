"use client";
import { useState } from "react";
import { input } from "../components/ToolShell";

const yen = (n: number) => `${Math.round(n).toLocaleString("ja-JP")} 円`;

function Num({ label, value, set, unit }: { label: string; value: string; set: (s: string) => void; unit?: string }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="w-28 shrink-0 text-gray-600">{label}</span>
      <input className={input} inputMode="decimal" value={value} onChange={(e) => set(e.target.value)} />
      {unit && <span className="text-gray-500">{unit}</span>}
    </label>
  );
}

export default function Client() {
  const [price, setPrice] = useState("1000");
  const [rate, setRate] = useState("10");
  const [off, setOff] = useState("20");
  const [a, setA] = useState("30");
  const [b, setB] = useState("120");
  const p = Number(price), r = Number(rate), o = Number(off), x = Number(a), y = Number(b);
  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h2 className="font-semibold">消費税</h2>
        <Num label="金額" value={price} set={setPrice} unit="円" />
        <Num label="税率" value={rate} set={setRate} unit="%" />
        <p className="text-sm">税抜 {yen(p)} → 税込 <b>{yen(p * (1 + r / 100))}</b></p>
        <p className="text-sm">税込 {yen(p)} → 税抜 <b>{yen(p / (1 + r / 100))}</b></p>
      </section>
      <section className="space-y-2">
        <h2 className="font-semibold">割引</h2>
        <Num label="割引率" value={off} set={setOff} unit="% OFF" />
        <p className="text-sm">{yen(p)} の {o}% OFF → <b>{yen(p * (1 - o / 100))}</b>(<b>{yen(p * (o / 100))}</b> お得)</p>
      </section>
      <section className="space-y-2">
        <h2 className="font-semibold">割合</h2>
        <Num label="A" value={a} set={setA} />
        <Num label="B" value={b} set={setB} />
        <p className="text-sm">A は B の <b>{y ? `${Math.round((x / y) * 10000) / 100} %` : "-"}</b></p>
      </section>
    </div>
  );
}

"use client";
import { useState } from "react";
import { btn, btnSub, input } from "../components/ToolShell";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digit: "0123456789",
  symbol: "!@#$%^&*()-_=+[]{};:,.?",
} as const;
type Key = keyof typeof SETS;
const LABELS: Record<Key, string> = { lower: "小文字", upper: "大文字", digit: "数字", symbol: "記号" };

function randomInt(max: number) {
  const limit = Math.floor(0x100000000 / max) * max;
  const buf = new Uint32Array(1);
  do crypto.getRandomValues(buf); while (buf[0] >= limit);
  return buf[0] % max;
}

function generate(length: number, enabled: Key[]) {
  if (enabled.length === 0) return "";
  const pool = enabled.map((k) => SETS[k]).join("");
  const chars = enabled.map((k) => SETS[k][randomInt(SETS[k].length)]);
  while (chars.length < length) chars.push(pool[randomInt(pool.length)]);
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.slice(0, length).join("");
}

export default function Client() {
  const [length, setLength] = useState(16);
  const [on, setOn] = useState<Record<Key, boolean>>({ lower: true, upper: true, digit: true, symbol: true });
  const [pw, setPw] = useState("");
  const [copied, setCopied] = useState(false);
  const enabled = (Object.keys(on) as Key[]).filter((k) => on[k]);
  const make = () => { setPw(generate(length, enabled)); setCopied(false); };
  const copy = async () => { await navigator.clipboard.writeText(pw); setCopied(true); };
  return (
    <div className="space-y-4">
      <label className="block text-sm">長さ: <b>{length}</b>
        <input type="range" min={6} max={64} value={length} onChange={(e) => setLength(+e.target.value)} className="mt-1 w-full" />
      </label>
      <div className="flex flex-wrap gap-4 text-sm">
        {(Object.keys(SETS) as Key[]).map((k) => (
          <label key={k} className="flex items-center gap-1">
            <input type="checkbox" checked={on[k]} onChange={(e) => setOn({ ...on, [k]: e.target.checked })} />{LABELS[k]}
          </label>
        ))}
      </div>
      <div className="flex gap-2">
        <button className={btn} onClick={make} disabled={enabled.length === 0}>生成</button>
        <button className={btnSub} onClick={copy} disabled={!pw}>{copied ? "コピーしました" : "コピー"}</button>
      </div>
      <input readOnly className={`${input} font-mono`} value={pw} placeholder="「生成」を押してください" />
    </div>
  );
}

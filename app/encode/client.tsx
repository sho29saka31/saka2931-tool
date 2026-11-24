"use client";
import { useState } from "react";
import { btn, btnSub, input } from "../components/ToolShell";

const b64enc = (s: string) => { const b = new TextEncoder().encode(s); let r = ""; b.forEach((x) => (r += String.fromCharCode(x))); return btoa(r); };
const b64dec = (s: string) => new TextDecoder("utf-8", { fatal: true }).decode(Uint8Array.from(atob(s.trim()), (c) => c.charCodeAt(0)));

export default function Client() {
  const [text, setText] = useState("");
  const [out, setOut] = useState("");
  const [error, setError] = useState("");
  const run = (fn: (s: string) => string) => {
    try { setOut(fn(text)); setError(""); } catch { setOut(""); setError("変換できませんでした。入力の形式を確認してください。"); }
  };
  return (
    <div className="space-y-3">
      <textarea className={`${input} h-32`} value={text} onChange={(e) => setText(e.target.value)} placeholder="変換したい文字列" spellCheck={false} />
      <div className="flex flex-wrap gap-2">
        <button className={btn} onClick={() => run(b64enc)}>Base64 エンコード</button>
        <button className={btnSub} onClick={() => run(b64dec)}>Base64 デコード</button>
        <button className={btn} onClick={() => run(encodeURIComponent)}>URL エンコード</button>
        <button className={btnSub} onClick={() => run(decodeURIComponent)}>URL デコード</button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <textarea readOnly className={`${input} h-32 bg-gray-50 font-mono`} value={out} placeholder="結果" />
    </div>
  );
}

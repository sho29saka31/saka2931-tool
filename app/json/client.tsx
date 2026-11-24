"use client";
import { useState } from "react";
import { btn, btnSub, input } from "../components/ToolShell";

export default function Client() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const apply = (indent?: number) => {
    try {
      setText(JSON.stringify(JSON.parse(text), null, indent));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "JSON の解析に失敗しました");
    }
  };
  return (
    <div className="space-y-3">
      <textarea className={`${input} h-64 font-mono`} value={text} onChange={(e) => { setText(e.target.value); setError(""); }} placeholder='{"hello":"world"}' spellCheck={false} />
      <div className="flex gap-2">
        <button className={btn} onClick={() => apply(2)}>整形</button>
        <button className={btnSub} onClick={() => apply()}>圧縮</button>
      </div>
      {error && <p className="text-sm text-red-600">エラー: {error}</p>}
    </div>
  );
}

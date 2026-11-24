"use client";
import { useMemo, useState } from "react";
import { input } from "../components/ToolShell";

type Op = { t: "same" | "add" | "del"; line: string };

/** 行単位の LCS(最長共通部分列)による差分。入力は数千行程度までを想定。 */
function diffLines(a: string[], b: string[]): Op[] {
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--)
    dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out: Op[] = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { out.push({ t: "same", line: a[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) out.push({ t: "del", line: a[i++] });
    else out.push({ t: "add", line: b[j++] });
  }
  while (i < n) out.push({ t: "del", line: a[i++] });
  while (j < m) out.push({ t: "add", line: b[j++] });
  return out;
}

const LIMIT = 3000;
const STYLE = { same: "text-gray-700", add: "bg-green-100 text-green-900", del: "bg-red-100 text-red-900" } as const;
const MARK = { same: "  ", add: "+ ", del: "- " } as const;

export default function Client() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const la = a === "" ? [] : a.split("\n"), lb = b === "" ? [] : b.split("\n");
  const tooBig = la.length > LIMIT || lb.length > LIMIT;
  const ops = useMemo(() => (tooBig ? [] : diffLines(la, lb)), [a, b, tooBig]); // eslint-disable-line react-hooks/exhaustive-deps
  const add = ops.filter((o) => o.t === "add").length, del = ops.filter((o) => o.t === "del").length;
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <textarea className={`${input} h-48 font-mono`} value={a} onChange={(e) => setA(e.target.value)} placeholder="変更前のテキスト" spellCheck={false} />
        <textarea className={`${input} h-48 font-mono`} value={b} onChange={(e) => setB(e.target.value)} placeholder="変更後のテキスト" spellCheck={false} />
      </div>
      {tooBig ? <p className="text-sm text-red-600">行数が多すぎます(各 {LIMIT} 行まで)。</p> : (a || b) && (
        <>
          <p className="text-sm text-gray-600">追加 <b className="text-green-700">{add}</b> 行 / 削除 <b className="text-red-700">{del}</b> 行</p>
          <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-white p-2 text-sm">
            {ops.map((o, i) => <div key={i} className={`whitespace-pre-wrap px-2 ${STYLE[o.t]}`}>{MARK[o.t]}{o.line}</div>)}
          </pre>
        </>
      )}
    </div>
  );
}

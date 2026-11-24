"use client";
import { useEffect, useState } from "react";
import { input } from "../components/ToolShell";

const LEVELS = [["L", "低(7%)"], ["M", "中(15%)"], ["Q", "やや高(25%)"], ["H", "高(30%)"]] as const;

export default function Client() {
  const [text, setText] = useState("https://tool.saka2931.jp");
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [size, setSize] = useState(256);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!text) { setUrl(""); setError(""); return; }
    let live = true;
    import("qrcode")
      .then((QR) => QR.toDataURL(text, { errorCorrectionLevel: level, width: size, margin: 2 }))
      .then((u) => { if (live) { setUrl(u); setError(""); } })
      .catch(() => { if (live) { setUrl(""); setError("QR コードにできませんでした(文字数が多すぎる可能性があります)。"); } });
    return () => { live = false; };
  }, [text, level, size]);

  return (
    <div className="space-y-4">
      <textarea className={`${input} h-24`} value={text} onChange={(e) => setText(e.target.value)} placeholder="URL や文字列を入力" />
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <label className="flex items-center gap-2">誤り訂正
          <select className={`${input} w-auto`} value={level} onChange={(e) => setLevel(e.target.value as typeof level)}>
            {LEVELS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2">サイズ
          <select className={`${input} w-auto`} value={size} onChange={(e) => setSize(+e.target.value)}>
            {[128, 256, 512, 1024].map((s) => <option key={s} value={s}>{s}px</option>)}
          </select>
        </label>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {url && (
        <div className="space-y-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="生成された QR コード" width={Math.min(size, 320)} height={Math.min(size, 320)} className="rounded-lg border border-gray-200" />
          <div><a href={url} download="qrcode.png" className="inline-block rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">PNG で保存</a></div>
        </div>
      )}
    </div>
  );
}

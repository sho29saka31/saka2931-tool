"use client";
import { useState } from "react";
import { input } from "../components/ToolShell";

function parseHex(s: string): [number, number, number] | null {
  let h = s.trim().replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(h)) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
}

function toHsl([r, g, b]: [number, number, number]): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  const l = (max + min) / 2;
  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60; if (h < 0) h += 360;
  }
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

export default function Client() {
  const [hex, setHex] = useState("#3b82f6");
  const rgb = parseHex(hex);
  const hsl = rgb && toHsl(rgb);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input type="color" value={rgb ? "#" + rgb.map((n) => n.toString(16).padStart(2, "0")).join("") : "#000000"} onChange={(e) => setHex(e.target.value)} className="h-10 w-14" />
        <input className={input} value={hex} onChange={(e) => setHex(e.target.value)} placeholder="#3b82f6" />
      </div>
      {rgb && hsl ? (
        <>
          <div className="h-24 rounded-md border border-gray-200" style={{ background: `rgb(${rgb.join(",")})` }} />
          <dl className="space-y-1 font-mono text-sm">
            <div>HEX: #{rgb.map((n) => n.toString(16).padStart(2, "0")).join("")}</div>
            <div>RGB: rgb({rgb.join(", ")})</div>
            <div>HSL: hsl({hsl[0]}, {hsl[1]}%, {hsl[2]}%)</div>
          </dl>
        </>
      ) : (
        <p className="text-sm text-red-600">HEX 形式(例: #3b82f6 または #38f)で入力してください。</p>
      )}
    </div>
  );
}

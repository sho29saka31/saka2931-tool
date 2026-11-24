"use client";
import { useEffect, useRef, useState } from "react";
import { btn, btnSub } from "../components/ToolShell";

const WORK = 25 * 60;
const BREAK = 5 * 60;

export default function Client() {
  const [mode, setMode] = useState<"work" | "break">("work");
  const [left, setLeft] = useState(WORK);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(0);
  const endAt = useRef(0);

  useEffect(() => {
    if (!running) return;
    endAt.current = Date.now() + left * 1000;
    const id = setInterval(() => {
      const rest = Math.max(0, Math.round((endAt.current - Date.now()) / 1000));
      setLeft(rest);
      if (rest === 0) {
        setRunning(false);
        if (mode === "work") { setDone((d) => d + 1); setMode("break"); setLeft(BREAK); }
        else { setMode("work"); setLeft(WORK); }
        if ("vibrate" in navigator) navigator.vibrate?.(300);
      }
    }, 250);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, mode]);

  useEffect(() => { document.title = `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")} | Saka Tools`; }, [left]);

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const reset = () => { setRunning(false); setMode("work"); setLeft(WORK); };
  return (
    <div className="text-center">
      <div className={`text-sm font-medium ${mode === "work" ? "text-red-600" : "text-green-600"}`}>{mode === "work" ? "集中" : "休憩"}</div>
      <div className="my-2 font-mono text-7xl font-bold tabular-nums">{mm}:{ss}</div>
      <div className="flex justify-center gap-2">
        <button className={btn} onClick={() => setRunning(!running)}>{running ? "一時停止" : "スタート"}</button>
        <button className={btnSub} onClick={reset}>リセット</button>
      </div>
      <p className="mt-4 text-sm text-slate-500">完了したセット: {done}</p>
    </div>
  );
}

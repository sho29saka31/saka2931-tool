import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "tool";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 96, backgroundColor: "#f9fafb", color: "#111827" }}>
        <div style={{ fontSize: 40, color: "#6b7280" }}>tool.saka2931.jp</div>
        <div style={{ fontSize: 120, fontWeight: 700, marginTop: 16 }}>tool</div>
        <div style={{ fontSize: 40, color: "#4b5563", marginTop: 24 }}>日常で使う小さなWebツール集</div>
      </div>
    ),
    size,
  );
}

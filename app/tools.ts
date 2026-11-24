export type Tool = { slug: string; name: string; description: string; icon: string };

export const tools: Tool[] = [
  { slug: "char-counter", name: "文字数カウント", description: "文字数・行数・バイト数・原稿用紙換算を即時に表示", icon: "📝" },
  { slug: "password", name: "パスワード生成", description: "長さと文字種を選んで安全なパスワードを生成", icon: "🔐" },
  { slug: "color", name: "カラー変換", description: "HEX / RGB / HSL を相互変換してプレビュー", icon: "🎨" },
  { slug: "pomodoro", name: "ポモドーロタイマー", description: "25分集中＋5分休憩を繰り返す作業タイマー", icon: "🍅" },
  { slug: "json", name: "JSON整形", description: "JSON の整形・圧縮・文法チェック", icon: "🧾" },
  { slug: "date", name: "日付計算", description: "2つの日付の差と、日数の加減算", icon: "📅" },
];

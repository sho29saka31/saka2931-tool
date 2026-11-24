export type Tool = { slug: string; name: string; description: string; icon: string };

export const tools: Tool[] = [
  { slug: "char-counter", name: "文字数カウント", description: "文字数・行数・バイト数・原稿用紙換算を即時に表示", icon: "📝" },
  { slug: "password", name: "パスワード生成", description: "長さと文字種を選んで安全なパスワードを生成", icon: "🔐" },
  { slug: "color", name: "カラー変換", description: "HEX / RGB / HSL を相互変換してプレビュー", icon: "🎨" },
  { slug: "pomodoro", name: "ポモドーロタイマー", description: "25分集中＋5分休憩を繰り返す作業タイマー", icon: "🍅" },
  { slug: "json", name: "JSON整形", description: "JSON の整形・圧縮・文法チェック", icon: "🧾" },
  { slug: "date", name: "日付計算", description: "2つの日付の差と、日数の加減算", icon: "📅" },
  { slug: "unit", name: "単位変換", description: "長さ・重さ・温度・面積・容量・速度の単位を相互変換", icon: "" },
  { slug: "encode", name: "エンコード変換", description: "Base64 と URL エンコードの変換・復元", icon: "" },
  { slug: "kana", name: "文字種変換", description: "全角半角・ひらがなカタカナ・大文字小文字の一括変換", icon: "" },
  { slug: "random", name: "ランダム抽選", description: "くじ引き・サイコロ・並び替えをランダムに実行", icon: "" },
  { slug: "calc", name: "割合・税計算", description: "消費税の税込・税抜、割引後の価格、割合(%)の計算", icon: "" },
  { slug: "qrcode", name: "QRコード作成", description: "URLや文字列から QR コードを作成し、PNG 画像として保存", icon: "" },
  { slug: "diff", name: "テキスト差分比較", description: "2つのテキストを行単位で比較し、追加・削除された行を色分け表示", icon: "" },
];

export type Tool = { slug: string; name: string; description: string; category: string };

export const categories = [
  { id: "text", name: "テキスト" },
  { id: "dev", name: "開発" },
  { id: "make", name: "つくる" },
  { id: "calc", name: "計算・時間" },
];

export const tools: Tool[] = [
  { slug: "char-counter", category: "text", name: "文字数カウント", description: "文字数、行数、バイト数を数える。原稿用紙の枚数つき" },
  { slug: "kana", category: "text", name: "文字種変換", description: "全角と半角、ひらがなとカタカナ、大文字と小文字をまとめて直す" },
  { slug: "diff", category: "text", name: "テキスト差分比較", description: "2つの文章を行ごとに比べて、違う行に色をつける" },
  { slug: "json", category: "dev", name: "JSON整形", description: "JSONを読みやすく整える。圧縮と文法チェックもできる" },
  { slug: "encode", category: "dev", name: "エンコード変換", description: "Base64とURLエンコードの変換、元に戻す操作" },
  { slug: "color", category: "dev", name: "カラー変換", description: "HEX、RGB、HSLを行き来しながら色を確かめる" },
  { slug: "password", category: "make", name: "パスワード生成", description: "長さと文字の種類を選んで、ランダムなパスワードを作る" },
  { slug: "qrcode", category: "make", name: "QRコード作成", description: "URLや文字列をQRコードにして、PNGで保存する" },
  { slug: "random", category: "make", name: "ランダム抽選", description: "くじ引き、並び替え、サイコロ" },
  { slug: "unit", category: "calc", name: "単位変換", description: "長さ、重さ、温度、面積、容量、速度を換算する" },
  { slug: "calc", category: "calc", name: "割合・税計算", description: "消費税、割引、割合(%)を計算する" },
  { slug: "date", category: "calc", name: "日付計算", description: "日付の差と、○日後・○日前の日付" },
  { slug: "pomodoro", category: "calc", name: "ポモドーロタイマー", description: "25分作業、5分休憩を繰り返す" },
];

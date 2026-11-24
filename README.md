# Saka Tools

登録不要・無料で使えるシンプルなWebツール集(文字数カウント、パスワード生成、カラー変換、ポモドーロ、JSON整形、日付計算)。

- 公開URL: https://tool.saka2931.jp
- 構成: TypeScript / Next.js (App Router) / [vinext](https://github.com/cloudflare/vinext) / Tailwind CSS / Cloudflare Workers

## 開発

```bash
npm install
npm run dev     # 開発サーバー
npm run build   # 本番ビルド
npm run start   # ビルド結果をローカルでプレビュー
npm run deploy  # Cloudflare Workers へデプロイ
```

データはすべてブラウザ内で処理され、サーバーには送信されません。

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

## 環境変数

| 変数 | 説明 |
|---|---|
| `NEXT_PUBLIC_GTM_CONTAINER_ID` | Google Tag Manager のコンテナID(例: `GTM-XXXXXXX`)。未設定なら GTM も Cookie 同意バナーも無効。 |

`.env.example` を `.env`(または `.env.production`)にコピーして設定します。`NEXT_PUBLIC_` の値は**ビルド時に埋め込まれる**ため、デプロイするビルド環境(ローカル、または Cloudflare のビルド設定)で指定してください。GTM は Consent Mode v2 に対応し、同意(`.saka2931.jp` 共通の Cookie)を得てから読み込みます。

## SEO

`app/lib/seo.ts` でページごとの title / description / canonical / OGP / Twitter カード / 構造化データ(JSON-LD)を生成します。`robots.txt`・`sitemap.xml`・アイコン・OGP 画像は `app/` 配下のファイルから自動生成されます。

## デプロイ(Cloudflare Workers)

公開先は独自ドメイン `tool.saka2931.jp` のみです。`cloudflare.config.ts` で `workersDev: false`・`previewUrls: false` を指定しており、`*.workers.dev` の URL もプレビュー URL も作られません(Pages も使いません)。

```bash
npx cf auth login # 初回のみ(ブラウザで Cloudflare にログイン)
npm run deploy    # ビルドして本番へデプロイ
```

前提: `saka2931.jp` が同じ Cloudflare アカウントのゾーンとして管理されていること(独自ドメインの DNS レコードと証明書は自動で作成されます)。

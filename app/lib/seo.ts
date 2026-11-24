import type { Metadata } from "next";

/** 本番の正規URL。canonical・sitemap・robots はすべてここを基準にする */
export const BASE_URL = "https://tool.saka2931.jp";
export const SITE_NAME = "Saka Tools";
const OG_IMAGE = "/opengraph-image";

/**
 * 公開ページ共通の metadata。Next.js は openGraph / twitter をページ単位で丸ごと置き換えるため、
 * ページ側で毎回 images を明示して、全ページで OGP / Twitter カードの画像が出るようにする。
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = `${BASE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE_NAME, locale: "ja_JP", type: "website", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  };
}

/** ツール・ゲーム個別ページ用 */
export const itemMetadata = (item: { slug: string; name: string; description: string }) =>
  pageMetadata({ title: item.name, description: item.description, path: `/${item.slug}` });

/** 検索結果のリッチ表示用の構造化データ(WebApplication) */
export const itemJsonLd = (item: { slug: string; name: string; description: string }, category: string) => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: item.name,
  description: item.description,
  url: `${BASE_URL}/${item.slug}`,
  applicationCategory: category,
  operatingSystem: "Any",
  inLanguage: "ja",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
  publisher: { "@type": "Person", name: "Shoki" },
});

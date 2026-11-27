import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import CookieBanner from "./components/CookieBanner";
import AgeNotice from "./components/AgeNotice";
import { BASE_URL, SITE_NAME } from "./lib/seo";

const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: `${SITE_NAME} | saka2931.jp`, template: `%s | ${SITE_NAME}` },
  description: "文字数カウント、パスワード生成、QRコード作成、単位変換、JSON整形など、日常の作業に使う小さなツール集。入力した内容は、お使いのブラウザの中だけで処理されます。",
  keywords: ["無料ツール", "Webツール", "文字数カウント", "パスワード生成", "QRコード作成", "単位変換", "JSON整形", "日付計算"],
  applicationName: SITE_NAME,
  authors: [{ name: "Shoki" }],
  alternates: { canonical: BASE_URL },
  robots: { index: true, follow: true },
  openGraph: { siteName: SITE_NAME, locale: "ja_JP", type: "website", url: BASE_URL, images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="flex min-h-screen flex-col antialiased">
        <script
          type="application/ld+json"
          // 検索エンジン向けの構造化データ(WebSite)。内容は固定値のみ
          dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: BASE_URL, inLanguage: "ja" }) }}
        />
        {GTM_CONTAINER_ID && (
          // Consent Mode v2 のデフォルト値(すべて拒否)を GTM 本体の読み込みより前に設定する。
          // GTM 本体は同意後に lib/consent.ts が読み込む。
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}
                gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'denied',personalization_storage:'denied',security_storage:'granted',wait_for_update:500});
                var m=document.cookie.match(/(?:^|; )cookie_consent=([^;]*)(?!.*cookie_consent=)/);
                if(m){var granted=m[1]==='accepted';gtag('consent','update',{analytics_storage:granted?'granted':'denied',functionality_storage:granted?'granted':'denied',personalization_storage:granted?'granted':'denied'});}`,
            }}
          />
        )}
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <AgeNotice />
        <CookieBanner />
      </body>
    </html>
  );
}

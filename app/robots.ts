import type { MetadataRoute } from "next";
import { BASE_URL } from "./lib/seo";

/** 全ページが公開・認証不要のため、全体をクロール許可する */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, host: BASE_URL, sitemap: `${BASE_URL}/sitemap.xml` };
}

import type { MetadataRoute } from "next";
import { BASE_URL } from "./lib/seo";
import { tools } from "./tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: BASE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    ...tools.map((i) => ({ url: `${BASE_URL}/${i.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}

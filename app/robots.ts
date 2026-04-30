import type { MetadataRoute } from "next";
const BASE = "https://global-macro-insight.vercel.app";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/auth/"] },
      { userAgent: "Googlebot", allow: "/", crawlDelay: 1 },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
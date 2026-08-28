import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://creamos.digital/sitemap.xml",
    host: "https://creamos.digital",
  };
}

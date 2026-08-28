import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const baseUrl = "https://creamos.digital";

export default function sitemap(): MetadataRoute.Sitemap {
  const articlesDirectory = path.join(process.cwd(), "public/articulos");
  const articles = fs.existsSync(articlesDirectory)
    ? fs
        .readdirSync(articlesDirectory)
        .filter((filename) => filename.endsWith(".md"))
        .map((filename) => ({
          url: `${baseUrl}/articulos/${filename.replace(/\.md$/, "")}`,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        }))
    : [];

  return [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/articulos`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...articles,
  ];
}

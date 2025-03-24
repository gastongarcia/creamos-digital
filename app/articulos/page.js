import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { Metadata } from "next";
import HamburgerMenu from "../components/HamburgerMenu";

// Metadata for the page
export const metadata = {
  title: "Artículos | Creamos Digital",
  description:
    "Artículos sobre desarrollo web, marketing digital, estrategias de contenido e inteligencia artificial.",
};

// Simple language detection function
function detectLanguage(text) {
  // Common Spanish words/patterns
  const spanishPatterns = [
    "la",
    "el",
    "los",
    "las",
    "sobre",
    "cómo",
    "qué",
    "por",
    "para",
    "realidad",
    "pueden",
    "hacer",
    "sistemas",
    "entre",
    "verdad",
  ];

  // Common English words/patterns
  const englishPatterns = [
    "the",
    "of",
    "and",
    "what",
    "how",
    "can",
    "reality",
    "ai",
    "systems",
    "about",
    "truth",
    "marketing",
  ];

  let spanishMatches = 0;
  let englishMatches = 0;

  const lowerText = text.toLowerCase();

  // Count pattern matches
  spanishPatterns.forEach((pattern) => {
    if (lowerText.includes(pattern)) spanishMatches++;
  });

  englishPatterns.forEach((pattern) => {
    if (lowerText.includes(pattern)) englishMatches++;
  });

  return spanishMatches > englishMatches ? "es" : "en";
}

// Function to get all articles
function getAllArticles() {
  const articlesDirectory = path.join(process.cwd(), "public/articulos");

  // Check if directory exists first
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(articlesDirectory);

  const articles = filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const fullPath = path.join(articlesDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data } = matter(fileContents);
      const title = data.title || extractTitleFromContent(fileContents);

      // Detect language from title if not specified in frontmatter
      const language = data.language || detectLanguage(title);

      return {
        slug,
        title,
        date: data.date,
        language,
      };
    });

  // Sort by date if available
  return articles.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
}

// Extract title from markdown content if no frontmatter
function extractTitleFromContent(content) {
  // Look for the first heading (# Title)
  const titleMatch = content.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1] : "Sin título";
}

// Get button text based on language
function getButtonText(language) {
  return language === "es" ? "Leer artículo →" : "Read article →";
}

// Get date format based on language
function formatDate(date, language) {
  return date.toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticlesPage() {
  const articles = getAllArticles();

  const articlesPageLinks = [
    { href: "/", label: "Inicio" },
    { href: "/articulos", label: "Artículos" },
  ];

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="py-16 md:py-20 border-b-4 border-black mb-12">
          <div className="flex justify-between items-start mb-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">
              Artículos
            </h1>
            <nav className="pt-2">
              <HamburgerMenu links={articlesPageLinks} />
            </nav>
          </div>
        </header>

        <main>
          {articles.length === 0 ? (
            <p className="text-xl">
              No hay artículos disponibles en este momento.
            </p>
          ) : (
            <div className="space-y-12">
              {articles.map((article, index) => (
                <div
                  key={article.slug}
                  className={`pb-8 ${
                    index < articles.length - 1 ? "border-b-2 border-black" : ""
                  }`}
                >
                  <Link
                    href={`/articulos/${article.slug}`}
                    className="block group"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:underline">
                      {article.title}
                    </h2>
                    {article.date && (
                      <p className="text-lg mb-4">
                        {formatDate(
                          new Date(article.date),
                          article.language || "es"
                        )}
                      </p>
                    )}
                    <div className="inline-block mt-4 px-4 py-2 border-2 border-black text-black group-hover:bg-black group-hover:text-white transition-colors">
                      {getButtonText(article.language || "es")}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </main>

        <footer className="py-12 mt-16 border-t-2 border-black text-center">
          <p className="text-xl">
            <Link href="/" className="hover:underline">
              Creamos Digital
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}

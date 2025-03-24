import Link from "next/link";
// Remove direct import from 'next'
// import { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import HamburgerMenu from "../../components/HamburgerMenu";

// Function to get article data for metadata
function getArticleData(slug) {
  try {
    const articlePath = path.join(
      process.cwd(),
      "public/articulos",
      `${slug}.md`
    );
    if (fs.existsSync(articlePath)) {
      const fileContent = fs.readFileSync(articlePath, "utf8");
      const { data } = matter(fileContent);

      // Detect language from title if not specified in frontmatter
      const language = data.language || detectLanguage(data.title || slug);

      return {
        title: data.title || slug,
        description: data.description || `Artículo: ${data.title || slug}`,
        language,
      };
    }
  } catch (error) {
    // Silently continue with defaults
  }

  return {
    title: "Artículo | Creamos Digital",
    description: "Artículo en Creamos Digital",
    language: "es",
  };
}

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

// Get navigation text based on language
function getNavText(language) {
  return {
    home: language === "es" ? "Inicio" : "Home",
    articles: language === "es" ? "Artículos" : "Articles",
  };
}

// Dynamic metadata
export async function generateMetadata({ params }) {
  // Await the params object to properly access dynamic route parameters
  const resolvedParams = await params;
  const slug = resolvedParams.slug || "unknown";
  const articleData = getArticleData(slug);

  return {
    title: `${articleData.title} | Creamos Digital`,
    description: articleData.description,
  };
}

// Very basic markdown to HTML converter
function markdownToHtml(markdown) {
  // Split into lines
  const lines = markdown.split("\n");
  let html = "";
  let inList = false;
  let inOrderedList = false;
  let inBlockquote = false;
  let foundFirstHeading = false;

  // Group lines for list processing
  let currentOrderedList = [];
  let processingOrderedList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // End of ordered list detection
    if (processingOrderedList && (!line || !/^\d+\.\s/.test(line))) {
      // Process the collected ordered list
      if (currentOrderedList.length > 0) {
        html += '<ol class="list-decimal pl-6 space-y-2 mb-4">\n';
        currentOrderedList.forEach((item, index) => {
          html += `<li>${item}</li>\n`;
        });
        html += "</ol>\n";
        currentOrderedList = [];
      }
      processingOrderedList = false;
    }

    // Skip empty lines
    if (!line) {
      if (inList) {
        html += "</ul>\n";
        inList = false;
      }
      if (inBlockquote) {
        html += "</blockquote>\n";
        inBlockquote = false;
      }
      html += "<br/>\n";
      continue;
    }

    // Process line content
    // Bold
    line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Italic
    line = line.replace(/\*(.*?)\*/g, "<em>$1</em>");
    // Images
    if (line.match(/^!\[(.*?)\]\((.*?)\)$/)) {
      const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
      const alt = imageMatch[1];
      const src = imageMatch[2];
      html += `<div class="my-8"><img src="${src}" alt="${alt}" class="mx-auto border-2 border-black max-w-full" /></div>\n`;
      continue;
    }
    // Links
    line = line.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" class="border-b-2 border-black hover:bg-black hover:text-white">$1</a>'
    );

    // Headings
    if (line.startsWith("# ")) {
      // Skip the first h1 heading as it's already in the header
      if (!foundFirstHeading) {
        foundFirstHeading = true;
        continue;
      }
      html += `<h1 class="text-5xl font-bold mb-6 pt-4">${line.substring(
        2
      )}</h1>\n`;
    } else if (line.startsWith("## ")) {
      html += `<h2 class="text-3xl font-bold mt-8 mb-4">${line.substring(
        3
      )}</h2>\n`;
    } else if (line.startsWith("### ")) {
      html += `<h3 class="text-2xl font-bold mt-6 mb-3">${line.substring(
        4
      )}</h3>\n`;
    }
    // Blockquotes
    else if (line.startsWith("> ")) {
      if (!inBlockquote) {
        html +=
          '<blockquote class="border-l-4 border-black pl-4 italic my-6">\n';
        inBlockquote = true;
      }
      html += `<p class="mb-2">${line.substring(2)}</p>\n`;
    }
    // Ordered list items - collect but don't render yet
    else if (/^\d+\.\s/.test(line)) {
      processingOrderedList = true;
      currentOrderedList.push(line.replace(/^\d+\.\s/, ""));
    }
    // Unordered list items
    else if (line.startsWith("- ")) {
      if (!inList) {
        html += '<ul class="list-disc pl-6 space-y-2 mb-4">\n';
        inList = true;
      }
      html += `<li>${line.substring(2)}</li>\n`;
    }
    // Horizontal rule
    else if (line === "---") {
      html += '<hr class="border-t-2 border-black my-10" />\n';
    }
    // Regular paragraph
    else {
      html += `<p class="mb-4">${line}</p>\n`;
    }
  }

  // Handle any remaining list
  if (currentOrderedList.length > 0) {
    html += '<ol class="list-decimal pl-6 space-y-2 mb-4">\n';
    currentOrderedList.forEach((item, index) => {
      html += `<li>${item}</li>\n`;
    });
    html += "</ol>\n";
  }

  // Close any open tags
  if (inList) html += "</ul>\n";
  if (inBlockquote) html += "</blockquote>\n";

  return html;
}

// Get date format based on language
function formatDate(date, language) {
  return date.toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Simplified article page
export default async function ArticlePage({ params }) {
  // Await the params object to properly access dynamic route parameters
  const resolvedParams = await params;
  const slug = resolvedParams.slug || "unknown";
  let title = slug;
  let date = null;
  let htmlContent = "<p>Content not available</p>";
  let language = "es";

  try {
    // Read the file
    const articlePath = path.join(
      process.cwd(),
      "public/articulos",
      `${slug}.md`
    );
    if (fs.existsSync(articlePath)) {
      const fileContent = fs.readFileSync(articlePath, "utf8");
      const { data, content } = matter(fileContent);
      title = data.title || title;
      date = data.date ? new Date(data.date) : null;

      // Detect language from title if not specified in frontmatter
      language = data.language || detectLanguage(title);

      // Convert markdown to HTML
      htmlContent = markdownToHtml(content);
    }
  } catch (error) {
    // Silently continue with defaults if any error occurs
  }

  const navText = getNavText(language);

  const articleNavLinks = [
    { href: "/", label: navText.home },
    { href: "/articulos", label: navText.articles },
  ];

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="py-16 md:py-20 border-b-4 border-black mb-12">
          <div className="flex justify-between items-start">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter pr-8 max-w-[80%]">
              {title}
            </h1>
            <nav className="pt-2">
              <HamburgerMenu links={articleNavLinks} />
            </nav>
          </div>
        </header>

        <main>
          <article className="space-y-6">
            {date && (
              <div className="text-xl mb-8 md:mb-4">
                {formatDate(date, language)}
              </div>
            )}
            <div
              className="article-content text-xl"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </article>
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

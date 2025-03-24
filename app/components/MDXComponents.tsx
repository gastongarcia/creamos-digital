import { MDXRemoteProps } from "next-mdx-remote/rsc";
import Link from "next/link";

// Custom components for MDX styling that follow the brutalist design
const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-8 border-b-2 border-black pb-4">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-6">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl md:text-3xl font-bold mt-8 mb-4">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-xl mb-6">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="space-y-3 text-xl mb-6 ml-6">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="space-y-3 text-xl mb-6 ml-6 list-decimal">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="pl-2">{children}</li>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <Link
      href={href || "#"}
      className="border-b-2 border-black hover:bg-black hover:text-white transition-colors"
    >
      {children}
    </Link>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-bold">{children}</strong>
  ),
  hr: () => <hr className="border-t-2 border-black my-10" />,
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-black pl-4 italic my-6">
      {children}
    </blockquote>
  ),
};

export default components;

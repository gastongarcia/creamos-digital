# Creamos Digital Website

Sitio web corporativo de Creamos Digital, una consultora web con enfoque brutalista.

## Estructura del Sitio

- **Home:** Página principal con información de servicios
- **Artículos:** Blog con artículos sobre tecnología, marketing e IA

## Sistema de Blog

### Cómo agregar nuevos artículos

1. Crea un archivo markdown en la carpeta `public/articulos/` con el nombre deseado (ej: `mi-nuevo-articulo.md`).
2. Agrega el frontmatter al inicio del archivo:

```markdown
---
title: "Título del artículo"
date: "YYYY-MM-DD"
description: "Breve descripción para SEO"
---
```

3. Escribe el contenido del artículo en formato markdown.
4. El artículo aparecerá automáticamente en la página de artículos.

### Formato de Markdown

El blog soporta los siguientes elementos de markdown:

- Encabezados (# H1, ## H2, ### H3)
- Párrafos
- Listas ordenadas y desordenadas
- Enlaces
- Texto en negrita e itálica
- Bloques de cita
- Líneas horizontales

### Ruta de los artículos

- Listado de artículos: `/articulos`
- Artículo individual: `/articulos/[nombre-del-archivo]`

## Tecnologías

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Gray Matter (para parsear frontmatter)
- Next MDX Remote (para renderizar markdown)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

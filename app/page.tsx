"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import HamburgerMenu from "./components/HamburgerMenu";

export default function Home() {
  const phrases = [
    "en ideas claras",
    "en productos útiles",
    "en negocios sostenibles",
    "en inversiones rentables",
    "en objetivos claros",
    "en proyectos realistas",
    "en mejorar la vida",
    "en soluciones honestas",
    "en valor auténtico",
    "en trabajo con propósito",
  ];

  const [currentPhrase, setCurrentPhrase] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [delta, setDelta] = useState(100);

  const typingRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const fullPhrase = phrases[phraseIndex];

      if (isDeleting) {
        // Deleting text - make it faster
        setCurrentPhrase(fullPhrase.substring(0, currentPhrase.length - 1));
        setDelta(30); // Delete much faster (was 50)
      } else {
        // Typing text - make it faster
        setCurrentPhrase(fullPhrase.substring(0, currentPhrase.length + 1));
        setDelta(60); // Type faster (was 100)
      }

      // If completed typing the phrase
      if (!isDeleting && currentPhrase === fullPhrase) {
        setDelta(1500); // Shorter pause at end (was 2000)
        setIsDeleting(true);
      }
      // If deleted the phrase
      else if (isDeleting && currentPhrase === "") {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
        setDelta(300); // Shorter pause before typing next phrase (was 500)
      }
    };

    const timer = setTimeout(tick, delta);
    return () => clearTimeout(timer);
  }, [currentPhrase, delta, isDeleting, phraseIndex, phrases]);

  const homeNavLinks = [
    { href: "/", label: "Inicio" },
    { href: "/articulos", label: "Artículos" },
    { href: "https://tally.so/r/w8Robl", label: "Contacto" },
  ];

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <header className="py-16 md:py-24 border-b-4 border-black mb-12">
          <div className="flex justify-between items-start mb-8">
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter uppercase max-w-[80%]">
              Creamos
            </h1>
            <nav className="pt-2 ml-4">
              <HamburgerMenu links={homeNavLinks} />
            </nav>
          </div>

          <div className="h-12 flex items-center">
            <span className="text-2xl md:text-3xl font-normal inline-block">
              {currentPhrase}
              <span className="animate-pulse">|</span>
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-12">
          <section className="border-b-2 border-black pb-8">
            <p className="text-xl md:text-2xl mb-6">
              Transformamos ideas en proyectos web funcionales y sostenibles
              desde hace más de dos décadas. Nuestra metodología se basa en la
              planificación rigurosa y la optimización de recursos, evitando el
              desperdicio habitual en el desarrollo digital.
            </p>

            <p className="text-xl md:text-2xl mb-6">
              Bajo la dirección de Gastón García, hemos liderado iniciativas
              tecnológicas para organizaciones como Movistar, Uber y
              Mercedes-Benz, alternando entre la dirección de equipos
              multidisciplinarios y el desarrollo especializado para empresas en
              Costa Rica y todo Centroamérica.
            </p>
            <p className="text-xl md:text-2xl">
              Trabajamos de forma deliberadamente selectiva. La atención
              concentrada en pocos proyectos nos permite mantener estándares de
              calidad consistentes. Actualmente dirigimos proyectos para
              compañías en toda Latinoamérica, manteniendo equipos reducidos y
              comunicación directa.
            </p>
          </section>

          <section className="border-b-2 border-black pb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Si buscas ayuda profesional con tu proyecto digital
            </h2>

            <ul className="space-y-3 text-xl">
              <li className="flex items-start">
                <span className="mr-2 text-2xl">✔️</span>
                <span>Auditoría y análisis de un sitio web existente</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-2xl">✔️</span>
                <span>
                  Planificación y estrategia antes de lanzar un nuevo proyecto
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-2xl">✔️</span>
                <span>Optimización y mejora de sitios web con tu equipo</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-2xl">✔️</span>
                <span>
                  Capacitación en desarrollo web para equipos internos
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-2xl">✔️</span>
                <span>
                  Desarrollo eficiente con IA y herramientas de automatización
                </span>
              </li>
            </ul>
          </section>

          <section className="border-b-2 border-black pb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Nuestro enfoque es selectivo
            </h2>

            <p className="text-xl mb-4">No trabajamos con clientes que:</p>

            <ul className="space-y-3 text-xl">
              <li className="flex items-start">
                <span className="mr-2 text-2xl">❌</span>
                <span>No tienen idea de lo que quieren lograr</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-2xl">❌</span>
                <span>No valoran el proceso de planificación</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-2xl">❌</span>
                <span>No siguen recomendaciones estratégicas</span>
              </li>
            </ul>
          </section>

          <section className="text-center py-8">
            <p className="text-xl mb-6">
              Si tu proyecto se alinea con nuestra filosofía, completa este
              formulario:
            </p>

            <Link
              href="https://tally.so/r/w8Robl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 border-4 border-black text-black hover:bg-black hover:text-white transition-colors duration-300 text-xl font-bold"
            >
              👉 CONTACTO
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
}

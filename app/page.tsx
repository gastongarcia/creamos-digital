"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const phrases = [
    "en ideas claras",
    "en productos útiles",
    "en negocios sostenibles",
    "en inversiones rentables",
    "en mejorar el mundo",
    "en objetivos claros",
    "en proyectos realistas",
    "en mejorar la vida",
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

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <header className="py-16 md:py-24 border-b-4 border-black mb-12">
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
            Creamos
          </h1>

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
              Soy Gastón García, consultor, diseñador y desarrollador web con
              más de 20 años de experiencia. Me especializo en transformar ideas
              en proyectos digitales funcionales y sostenibles. No improviso:
              planifico cada detalle para evitar desperdicio de tiempo, dinero y
              energía.
            </p>

            <p className="text-xl md:text-2xl mb-6">
              He trabajado con marcas globales como Movistar, Uber, Trident,
              Halls, Mitsubishi y Mercedes-Benz y Legrand. También he
              desarrollado sitios web para pequeñas y medianas empresas en Costa
              Rica y liderado proyectos de activismo digital.
            </p>
            <p className="text-xl md:text-2xl">
              Mi enfoque es claro: soluciones bien pensadas, ejecuciones
              precisas y resultados reales.
            </p>
          </section>

          <section className="border-b-2 border-black pb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Si buscas ayuda con tu proyecto digital
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
              Pero antes de escribirme…
            </h2>

            <p className="text-xl mb-4">No me escribas si:</p>

            <ul className="space-y-3 text-xl">
              <li className="flex items-start">
                <span className="mr-2 text-2xl">❌</span>
                <span>No tienes idea de lo que quieres lograr</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-2xl">❌</span>
                <span>No valoras el proceso de planificación</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-2xl">❌</span>
                <span>No sigues recomendaciones estratégicas</span>
              </li>
            </ul>
          </section>

          <section className="text-center py-8">
            <p className="text-xl mb-6">
              Si tu proyecto calza con mi enfoque, llena este formulario:
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

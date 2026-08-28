"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import HamburgerMenu from "./components/HamburgerMenu";
import navigationLinks from "./components/navigationLinks";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://creamos.digital/#gaston-garcia",
        name: "Gastón García",
        url: "https://creamos.digital/",
        jobTitle: ["Consultor digital", "AI-forward developer"],
        knowsAbout: [
          "Consultoría digital",
          "Desarrollo de productos digitales",
          "Inteligencia artificial",
          "AI-forward development",
          "Capacitación en inteligencia artificial",
        ],
        homeLocation: {
          "@type": "Country",
          name: "Costa Rica",
        },
        sameAs: ["https://www.linkedin.com/in/gastongarcia/"],
        worksFor: {
          "@id": "https://creamos.digital/#organization",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://creamos.digital/#organization",
        name: "Creamos Digital",
        url: "https://creamos.digital/",
        founder: {
          "@id": "https://creamos.digital/#gaston-garcia",
        },
        areaServed: ["Costa Rica", "Centroamérica", "Latinoamérica"],
      },
    ],
  };

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

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <header className="py-16 md:py-24 border-b-4 border-black mb-12">
          <div className="flex justify-between items-start mb-8">
            <div className="text-5xl sm:text-6xl md:text-9xl font-bold tracking-tighter uppercase pr-4">
              Creamos
            </div>
            <nav className="pt-2 flex-shrink-0">
              <HamburgerMenu links={navigationLinks} />
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
          <section
            id="gaston-garcia"
            className="border-b-2 border-black pb-8 scroll-mt-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Gastón García
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              Ayudo a empresas a entender dónde están sus proyectos digitales,
              decidir qué conviene hacer primero y avanzar sin desperdiciar
              tiempo ni recursos. Combino más de dos décadas de experiencia en
              estrategia, desarrollo y dirección de productos digitales,
              incorporando inteligencia artificial cuando realmente aporta
              valor.
            </p>

            <p className="text-xl md:text-2xl mb-6">
              Trabajo desde Costa Rica con organizaciones de Centroamérica y
              Latinoamérica, ya sea ejecutando directamente, dirigiendo equipos
              internos o acompañando agencias externas.
            </p>

            <p className="text-xl md:text-2xl mb-6">
              Durante ese recorrido he liderado iniciativas tecnológicas para
              organizaciones como Movistar, Uber y Mercedes-Benz, alternando
              entre la dirección de equipos multidisciplinarios y el desarrollo
              especializado.
            </p>

            <Link
              href="https://www.linkedin.com/in/gastongarcia/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xl font-bold border-b-2 border-black hover:bg-black hover:text-white"
            >
              LinkedIn de Gastón García →
            </Link>
          </section>

          <section className="border-b-2 border-black pb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Cómo puedo ayudar
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  1. Consultoría digital senior
                </h3>
                <p className="text-xl">
                  Evaluación, priorización y dirección de proyectos digitales
                  para decidir qué conviene hacer primero y cómo avanzar.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  2. AI-forward development
                </h3>
                <p className="text-xl">
                  Diseño y desarrollo de productos digitales utilizando IA de
                  manera deliberada, práctica y responsable.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  3. Capacitación en inteligencia artificial
                </h3>
                <p className="text-xl">
                  Formación práctica para profesionales y equipos que necesitan
                  integrar IA en su trabajo.
                </p>
              </div>
            </div>
          </section>

          <section className="border-b-2 border-black pb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Nuestro enfoque es selectivo
            </h2>

            <p className="text-xl mb-4">No trabajamos con clientes que:</p>

            <ul className="space-y-3 text-xl">
              <li className="flex items-start">
                <span className="mr-2 text-2xl font-bold">✕</span>
                <span>No tienen idea de lo que quieren lograr</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-2xl font-bold">✕</span>
                <span>No valoran el proceso de planificación</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-2xl font-bold">✕</span>
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
              CONTACTO
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
}

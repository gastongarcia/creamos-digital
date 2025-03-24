"use client";

import { useState } from "react";
import Link from "next/link";

export default function HamburgerMenu({ links }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <button
        onClick={toggleMenu}
        className="p-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <div className="w-6 h-0.5 bg-current mb-1.5"></div>
        <div className="w-6 h-0.5 bg-current mb-1.5"></div>
        <div className="w-6 h-0.5 bg-current"></div>
      </button>

      {/* Menu Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border-2 border-black z-50">
          <ul className="py-2">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="block px-4 py-2 hover:bg-black hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

import { Link } from "react-router-dom";
import { useState } from "react";
import { categories } from "../types/categories";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="flex justify-between items-center tracking-widest p-5 bg-[#262B46] fixed left-1/2 transform -translate-x-1/2 w-[100%] pl-[10rem] pr-[10rem] z-10"
      aria-label="Website-Kopfbereich mit Navigation"
    >
      <Link to="/" aria-label="Zur Startseite">
        <h1 className="text-xl font-bold text-white hover:text-gray-400 transition-colors">
          DRINKS&CHILL
        </h1>
      </Link>

      <nav aria-label="mainnav">
        <div className="relative">
          <button 
            className="text-white hover:text-gray-400 transition-colors focus:outline-none focus:ring focus:ring-gray-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            MENU
          </button>
          {isOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <li>
                <Link
                  to={'/add-drink'}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors`}
                    onClick={() => setIsOpen(false)}
                >
                  Drink hinzufügen
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={`/${category.name.toLowerCase()}`}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors`}
                    onClick={() => setIsOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}

import React, { useContext, useRef } from "react";
import { mainContext } from "../context/MainProvider";

export default function Search() {
  const { setSearchQuery } = useContext(mainContext) as any;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = inputRef.current?.value?.trim();
    if (searchValue) {
      setSearchQuery(searchValue);
    } else {
      console.log("Bitte geben Sie einen Suchbegriff ein.");
    }
  };

  return (
    <form
      className="flex gap-4 m-14 mb-44"
      onSubmit={handleSubmit}
      aria-label="Cocktail-Suche"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Type something"
        className="px-4 p-2 w-44 rounded text-black bg-white border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
        aria-label="Suchfeld für Cocktails"
      />
      <button
        type="submit"
        className="px-4 p-2 w-28 rounded text-white bg-blue-500 hover:bg-blue-400 active:scale-90 transition-transform focus:ring focus:ring-blue-300"
        aria-label="Suche starten"
      >
        Search
      </button>
    </form>
  );
}

import React, { useContext, useRef, useState } from "react";
import { mainContext } from "../context/MainProvider";

export default function Search() {
  const { setSearchQuery } = useContext(mainContext) as any;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State für den Modal-Dialog
  const okButtonRef = useRef<HTMLButtonElement>(null); // Ref für den OK-Button

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = inputRef.current?.value?.trim();
    if (searchValue) {
      setSearchQuery(searchValue);
    } else {
      setIsModalOpen(true); // Modal öffnen
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Modal schließen
  };

  React.useEffect(() => {
    if (isModalOpen && okButtonRef.current) {
      okButtonRef.current.focus(); // Fokus auf den OK-Button setzen
    }
  }, [isModalOpen]);


  return (
    <>
      {/* Suchformular */}
      <form
        className="flex gap-4 m-14 mb-44 items-center justify-center"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-md text-center">
            <p className="text-xl mb-6">Bitte Suchbegriff eingeben!</p>
            <button
              ref={okButtonRef} // Ref für den OK-Button
              onClick={closeModal} // Modal schließen bei Klick auf OK
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// AddDrink.tsx
import React, { useState } from "react";

const AddDrink: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    imageUrl: "",
    instructions: "",
    ingredient1: "",
    quantity1: "",
    ingredient2: "",
    quantity2: "",
    ingredient3: "",
    quantity3: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Füge deine eigenen Getränke hinzu!</h1>
        
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Kategorie
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Kategorie wählen</option>
            <option value="Gin" className="bg-blue-300">Gin</option>
            <option value="Vodka" className="bg-violet-400">Vodka</option>
            <option value="Rum" className="bg-red-300">Rum</option>
            <option value="Scotch" className="bg-orange-300">Scotch</option>
            <option value="Alkoholfrei" className="bg-indigo-300">Alkoholfrei</option>
            <option value="Zufall" className="bg-green-300">Zufall</option>
          </select>
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-sm font-medium mb-2">
            Bild URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Instructions */}
        <div className="mb-4">
          <label htmlFor="instructions" className="block text-sm font-medium mb-2">
            Anleitung
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Ingredients and Quantities */}
        {[1, 2, 3].map((num) => (
          <div key={num} className="mb-4 grid grid-cols-[1fr_1fr] gap-x-4">
            <input
              type="text"
              name={`ingredient${num}`}
              placeholder={`Zutat ${num}`}
              value={(formData as any)[`ingredient${num}`]}
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name={`quantity${num}`}
              placeholder={`Menge Zutat ${num}`}
              value={(formData as any)[`quantity${num}`]}
              onChange={handleChange}
              className="p-2 rounded w-42 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddDrink;

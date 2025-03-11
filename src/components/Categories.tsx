import { Link } from "react-router-dom";
import { categories } from "../types/categories";

export default function Categories() {
  return (
    <section aria-label="Cocktail Categories" className="grid sm:grid-cols-2 grid-cols-1 gap-4">
      {categories.map((category) => (
        <Link to={`/${category.name.toLowerCase()}`} key={category.name}>
          <article
            className={`${category.color} h-96 flex flex-col justify-center p-20 cursor-pointer hover:bg-gray-500 transition-all`}
            aria-label={`Kategorie ${category.name}`}
          >
            <h3 className="text-6xl mb-2">{category.name}</h3>
            <p className="uppercase">{category.description}</p>
          </article>
        </Link>
      ))}
    </section>
  );
}

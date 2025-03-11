import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mainContext } from "../../context/MainProvider";
import Search from "../../components/Search";

interface IItem {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: number;
  strInstructions: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
}

const colors = [
  "bg-blue-300",
  "bg-violet-400",
  "bg-red-300",
  "bg-orange-300",
  "bg-indigo-300",
  "bg-green-300",
];


const getIngredients = (item: IItem): string[] => {
  const ingredients: string[] = [];
  for (let i = 1; i <= 10; i++) {
    const ingredient = item[`strIngredient${i}` as keyof IItem];
    if (ingredient && ingredient.toString().trim() !== "") {
      ingredients.push(ingredient.toString().trim());
    }
  }
  return ingredients;
};

interface ModalProps {
  cocktail: IItem | null;
  onClose: () => void;
}

const CocktailModal = ({ cocktail, onClose }: ModalProps) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cocktail) {
      try {
        const fetchedIngredients = getIngredients(cocktail);
        setIngredients(fetchedIngredients);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
        setIsLoading(false);
      }
    }
  }, [cocktail]);
  

  if (!cocktail) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center">
      <div className="p-8 rounded-lg w-1/2 bg-gray-500">
        <div className="flex-row gap-10">
          <div className="flex gap-10">
            <img
              className="w-1/2 h-1/2 mb-4"
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
            />
            <article className="w-1/2">
              <h2 className="text-2xl">{cocktail.strDrink}</h2>
              <h3 className="text-xl font-semibold mt-10 mb-2">Zutaten:</h3>
              <ul className="list-disc pl-5 mb-4">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="text-lg">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <p>{cocktail.strInstructions}</p>
        </div>

        <button
          onClick={onClose}
          className="bg-red-500 text-white py-2 px-4 rounded mt-4"
        >
          Schließen
        </button>
      </div>
    </div>
  );
};


export default function SelectedCat() {
  const { linkParam } = useParams();
  const { items, setLink } = useContext(mainContext) as any;

  const [selectedCocktail, setSelectedCocktail] = useState<IItem | null>(null);

  useEffect(() => {
    if (linkParam) {
      setLink(linkParam);
    }
  }, [linkParam]);

  const handleCocktailClick = async (item: IItem) => {
    try {
      // Fetch cocktail details using the provided API endpoint
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + item.strDrink.toLowerCase());
      const data = await response.json();
  
      // Check if drinks are available in the response
      if (data.drinks && data.drinks.length > 0) {
        const selectedDrink = data.drinks[0]; // Assuming the first drink is the one to display
  
        // Update the selected cocktail state with fetched details
        setSelectedCocktail({
          strDrink: selectedDrink.strDrink,
          strDrinkThumb: selectedDrink.strDrinkThumb,
          idDrink: parseInt(selectedDrink.idDrink, 10),
          strInstructions: selectedDrink.strInstructions,
          strIngredient1: selectedDrink.strIngredient1,
          strIngredient2: selectedDrink.strIngredient2,
          strIngredient3: selectedDrink.strIngredient3,
          strIngredient4: selectedDrink.strIngredient4,
          strIngredient5: selectedDrink.strIngredient5,
          strIngredient6: selectedDrink.strIngredient6,
          strIngredient7: selectedDrink.strIngredient7,
          strIngredient8: selectedDrink.strIngredient8,
          strIngredient9: selectedDrink.strIngredient9,
          strIngredient10: selectedDrink.strIngredient10,
        });
      } else {
        console.error('No drinks found for the given query.');
      }
    } catch (error) {
      console.error('Error fetching cocktail details:', error);
    }
  };
  

  const closeModal = () => {
    setSelectedCocktail(null);
  };

  return (
    <>
      <Search />
      <div className="grid grid-cols-2 gap-4">
        {items.map((item: IItem, index: number) => {
          const backgroundColor = colors[index % colors.length];

          return (
            <div
              key={item.idDrink}
              className={`flex p-10 ${backgroundColor} cursor-pointer`}
              onClick={() => handleCocktailClick(item)}
            >
              <img
                className="w-1/2"
                src={item.strDrinkThumb}
                alt={item.strDrink}
              />
              <div className="w-[100%] flex justify-center center items-center text-center text-xl">
                <p>{item.strDrink}</p>
              </div>
            </div>
          );
        })}
      </div>

      <CocktailModal cocktail={selectedCocktail} onClose={closeModal} />
    </>
  );
}

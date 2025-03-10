import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const mainContext = createContext({});

export default function MainProvider({children}:{children: React.ReactNode}){

    const [link, setLink] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [items, setItems] = useState<any>([]);

    useEffect(() => {
        
        const getData = async () => {
            let url = "";

            if (searchQuery !== "") { 
                url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`;
            } else if (link) {
                if (link === "gin") {
                    url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin";
                } else if (link === "vodka") {
                    url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka";
                } else if (link === "rum") { 
                    url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum";
                } else if (link === "scotch") {
                    url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Scotch";
                } else if (link === "alkoholfrei") {
                    url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
                } else if (link === "zufall"){   
                    url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";      
                }
            }

            try {
                if (url) { 
                    const resp = await axios.get(url);
                    if (resp.data.drinks) {
                        setItems(resp.data.drinks);
                    } else {
                        console.log("Keine Ergebnisse gefunden.");
                        setItems([]);
                    }
                }
            } catch (error) {
                console.error("Fehler beim Fetchen der Daten", error);
            }
        };
        getData();
    }, [link, searchQuery]);

    return (
        <mainContext.Provider value={{items, setLink, searchQuery, setSearchQuery}}>
            {children}
        </mainContext.Provider> 
    );
}
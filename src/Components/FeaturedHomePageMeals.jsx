import { useState, useEffect } from "react";
import { getRecipes } from "../api";
import "./featuredHomePageMeals.css";

export default function FeaturedHomePageMeals() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const loadRecipes = async () => {
      const response = await getRecipes();

      const shuffled = response.results
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);

      setRecipes(shuffled);
    };

    loadRecipes();
  }, []);

  return (
    <>
      <p className="introTitle">Featured Recipes</p>
      <ul className="featuredRecipesContainer">
        {recipes.map((item) => (
          <li key={item.id} className="recipeCard">
            <div className="topBlock">
              <img src={item.image} alt={item.title} />
              <p>{item.title}</p>
            </div>

            <div className="macroBlock">
              <p>
                Protein:{" "}
                {
                  item.nutrition.nutrients.find((n) => n.name === "Protein")
                    ?.amount
                }
              </p>
              <p>
                Fat:{" "}
                {item.nutrition.nutrients.find((n) => n.name === "Fat")?.amount}
              </p>
              <p>
                Carbs:{" "}
                {
                  item.nutrition.nutrients.find(
                    (n) => n.name === "Carbohydrates",
                  )?.amount
                }
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

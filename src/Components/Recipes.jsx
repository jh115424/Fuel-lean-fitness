import { getRecipes } from "../api";
// import React from "react";
import { useEffect, useState } from "react";
import "./recipes.css";

export default function MealPlan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectRecipe, setSelectRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [diet, setDiet] = useState("all");

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await getRecipes();
        setData(response.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadRecipes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredRecipes = data.filter((item) => {
    if (diet === "all") return true;
    if (diet === "high protein") {
      return (
        item.nutrition.nutrients.find((n) => n.name === "Protein")?.amount >= 30
      );
    }
    if (diet === "low carb") {
      return (
        item.nutrition.nutrients.find((n) => n.name === "Carbohydrates")
          ?.amount <= 30
      );
    }
    return item.diets.includes(diet);
  });

  return (
    <>
      <div className="recipesPageWrapper">
        <h4>Fuel Lean Fitness</h4>
        <p>Lean Plate</p>
        <h3 className="titleMotto">
          High-performance meals built around your macros
        </h3>

        <div className="dietPickButtons">
          <button onClick={() => setDiet("all")} className="recipeButtonAll">
            All
          </button>
          <button
            onClick={() => setDiet("high protein")}
            className="recipeButton"
          >
            High Protein
          </button>
          <button onClick={() => setDiet("low carb")} className="recipeButton">
            Low Carb
          </button>
          <button
            onClick={() => setDiet("paleolithic")}
            className="recipeButton"
          >
            Paleo
          </button>
          <button
            onClick={() => setDiet("gluten free")}
            className="recipeButton"
          >
            Gluten Free
          </button>
        </div>
        <ul className="imageAndRecipeWrapper">
          {filteredRecipes.map((item) => {
            console.log(item);
            return (
              <div className="recipeCard" key={item.id}>
                <div
                  className="featuredImages"
                  onClick={() => {
                    setSelectRecipe(item);
                    setIsModalOpen(true);
                  }}
                >
                  <img
                    className="featuredImg"
                    src={item.image}
                    alt={item.title}
                  />
                  <span className="recipeTag">
                    {item.nutrition.nutrients.find((n) => n.name === "Protein")
                      ?.amount >= 30
                      ? "High Protein"
                      : item.diets[0]}
                  </span>
                </div>

                <div className="recipeInfoDiv">
                  <div className="recipeNameDiv">
                    <li>
                      <span className="recipeTitle">{item.title}</span>
                    </li>
                  </div>
                  <div className="macroList">
                    <p>
                      Calories:{" "}
                      <span className={diet === "all" ? "macroNumber" : ""}>
                        {
                          item.nutrition.nutrients.find(
                            (n) => n.name === "Calories",
                          )?.amount
                        }
                      </span>
                    </p>
                    <p>
                      Protein:{" "}
                      <span
                        className={diet === "high protein" ? "macroNumber" : ""}
                      >
                        {
                          item.nutrition.nutrients.find(
                            (n) => n.name === "Protein",
                          )?.amount
                        }
                      </span>
                    </p>
                    <p>
                      Fat:{" "}
                      <span>
                        {
                          item.nutrition.nutrients.find((n) => n.name === "Fat")
                            ?.amount
                        }
                      </span>
                    </p>
                    <p>
                      Carbs:{" "}
                      <span
                        className={diet === "low carb" ? "macroNumber" : ""}
                      >
                        {
                          item.nutrition.nutrients.find(
                            (n) => n.name === "Carbohydrates",
                          )?.amount
                        }
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      </div>

      {isModalOpen && (
        <div className="ingredientAndRecipePopup">
          <button
            onClick={() => {
              setIsModalOpen(false);
              setSelectRecipe(null);
            }}
            className="closeButton"
          >
            Close
          </button>
          <img
            src={selectRecipe.image}
            alt={selectRecipe.title}
            className="recipePageImage"
          />
          <div className="nameAndIngredients">
            <header>{selectRecipe.title}</header>
            {selectRecipe.nutrition.ingredients.map((data) => (
              <div key={data.id} className="ingredientList">
                <p>
                  {data.name} — {data.amount}
                </p>
              </div>
            ))}
          </div>
          <div className="recipeStepsWrapper">
            {selectRecipe.analyzedInstructions[0].steps.map((step) => (
              <div key={step.number} className="recipeSteps">
                <p>
                  {step.number}. {step.step}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

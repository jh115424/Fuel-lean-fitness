import "./foodLog.css";
import { useState, useEffect } from "react";
import { getRecipes } from "../api";

export default function FoodLog({ loggedMeals, setLoggedMeals, handleClear }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  if (loading) return <p>Adding...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleAdd = () => {
    if (loggedMeals.length < 3) {
      const randomMeal = data[Math.floor(Math.random() * data.length)];
      setLoggedMeals([...loggedMeals, randomMeal]);
    }
  };

  return (
    <>
      <div className="foodLogContainer">
        <div className="foodLogTitle">
          <p className="mealPickTitle">FOOD LOG</p>
          <div className="logMealButton">
            <button onClick={handleAdd} className="addMealBtn">
              + Log meal
            </button>
            <button onClick={handleClear} className="clearMealBtn">
              Clear
            </button>
          </div>
        </div>
        <div className="underline"></div>
        <div className="loggedMealsContainer">
          {loggedMeals.slice(0, 3).map((food) => (
            <div className="loggedMealRow" key={food.id}>
              <img className="featuredImg" src={food.image} alt={food.title} />

              <div className="mealInfo">
                <span className="recipeTitle">{food.title}</span>
                <p className="calories">
                  {Math.round(
                    food.nutrition.nutrients.find((n) => n.name === "Calories")
                      ?.amount,
                  )}{" "}
                  cal
                </p>
              </div>

              <div className="proteinInfo">
                <p>
                  {Math.round(
                    food.nutrition.nutrients.find((n) => n.name === "Protein")
                      ?.amount,
                  )}
                  g P
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

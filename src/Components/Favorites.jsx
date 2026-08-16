import "./favorites.css";

import { Link } from "react-router";
import { useEffect, useState } from "react";
// import React from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFavorites = () => {
      setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
    };
    loadFavorites();
  }, []);

  return (
    <>
      <div className="favoritesContainer">
        <div className="title">
          <header>My Favorites</header>
        </div>
        <div className="favoriteRecipeBoxes">
          {favorites.map((item, index) => {
            console.log(item);
            return (
              <div className="boxContainer" key={index}>
                <img src={item.image} className="favImage" alt={item.title} />
                <div className="favRecipeInfo">
                  {item.title}
                  <div className="favMacros">
                    <div className="favMacroCalories">
                      <span>🔥</span>
                      {
                        item.nutrition.nutrients.find(
                          (n) => n.name === "Calories",
                        )?.amount
                      }
                    </div>
                    <div className="favMacroProtein">
                      <span>💪</span>
                      {
                        item.nutrition.nutrients.find(
                          (n) => n.name === "Protein",
                        )?.amount
                      }
                    </div>
                    <div className="favMacroCarbs">
                      <span>🍽</span>
                      {
                        item.nutrition.nutrients.find(
                          (n) => n.name === "Carbohydrates",
                        )?.amount
                      }
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

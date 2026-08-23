import "./favorites.css";
import dashBoard from "../assets/dashBoard.png";
import { Link } from "react-router";
import { useEffect, useState } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || [],
  );

  const removeRecipe = (item) => {
    const newFavorites = favorites.filter((fav) => fav.id !== item.id);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

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
          <div className="homeButton">
            {" "}
            <Link to="/home" className="homeLink">
              <button type="button" className="homePageButton">
                <img src={dashBoard} className="goHome" />
              </button>
            </Link>
          </div>
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
                      <span className="tag">cal</span>
                    </div>
                    <div className="favMacroProtein">
                      <span>💪</span>
                      {
                        item.nutrition.nutrients.find(
                          (n) => n.name === "Protein",
                        )?.amount
                      }
                      <span className="tag">g protein</span>
                    </div>
                    <div className="favMacroCarbs">
                      <span>🍽</span>
                      {item.nutrition.nutrients.find(
                        (n) => n.name === "Protein",
                      )?.amount >= 30
                        ? "High Protein"
                        : item.diets[0]}
                    </div>
                  </div>
                </div>
                <div className="deleteMeal">
                  <p className="letterX" onClick={() => removeRecipe(item)}>
                    X
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import "./dashBoard.css";
import { Link } from "react-router-dom";
import dashBoard from "../assets/dashBoard.png";
import FoodLog from "../Components/FoodLog.jsx";
import Goals from "../Components/Goals.jsx";
import SuggestedRecipe from "./SuggestedRecipe.jsx";
import WeeklyCaloriesChart from "./WeeklyCaloriesChart.jsx";

export default function DashBoard() {
  // const [goal, setGoal] = useState(2200);   use later
  const goal = 2200;
  // const [eat, setEaten] = useState(1283);   use later
  const eat = 1283;

  const [loggedMeals, setLoggedMeals] = useState([]);

  const remaining = goal - eat;

  const handleClear = () => {
    setLoggedMeals([]);
  };

  return (
    <>
      <div className="dashBoardContainer">
        <div className="topCalorieHeader">
          <div className="dashBoardTitle">
            <p>MY DASHBOARD</p>
            <h2>Personal Overview</h2>
          </div>
          <div className="dailyCaloriesLeft">
            <p>REMAINING TODAY</p>
            <h2 className="leftOverCalories">{remaining}</h2>
          </div>
        </div>
        <div className="dashBoardMainContent">
          <div className="leftColumn">
            <FoodLog
              loggedMeals={loggedMeals}
              setLoggedMeals={setLoggedMeals}
              handleClear={handleClear}
            />
            <WeeklyCaloriesChart />
          </div>
          <div className="rightColumn">
            <SuggestedRecipe />
            <Goals />
          </div>
        </div>
        <Link to="/home" className="homeLink">
          <button type="button" className="homePageButton">
            <img src={dashBoard} className="goHome" />
          </button>
        </Link>
      </div>
    </>
  );
}

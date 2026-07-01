import "./homePage.css";
import TopSearchBar from "./TopSearchBar";

import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import dumbbell from "../assets/dumbbell-xxl.png";
import DailyProgressCircle from "../Components/DailyProgressCircle.jsx";
import recipesHat from "../assets/recipesHat.png";
import workoutDumbbell from "../assets/workoutDumbbell.png";
import favoriteRecipes from "../assets/favoriteRecipes.jpg";
import dashboard from "../assets/dashBoard.png";
import progressClock from "../assets/progressClock.png";
import HomePageMiddleIntro from "./HomePageMiddleIntro";

export default function HomePage() {
  const [goal, setGoal] = useState(2200);
  const [eat, setEaten] = useState(1283);

  const [isOpen, setIsOpen] = useState(true);

  const [searchText, setSearchText] = useState("");

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="homePageBody">
        <div className={`sideMenuBar ${isOpen ? "" : "closed"}`}>
          <Link to="/home" className="homePage">
            <img src={dumbbell} className="greenDumbbell" />
            <p className="topTitle">Fuel Lean Fitness</p>
          </Link>

          <div className="mainMenu">
            <div className="dashBoardLink">
              <Link to="/dashboard" className="dashBoardPage">
                <img src={dashboard} className="sideMenuImage" />
                <p className="dashBoard">Dashboard</p>
              </Link>
            </div>

            <div className="recipeLink">
              <Link to="/recipes">
                <img src={recipesHat} className="sideMenuImage" />
                <p className="recipe">Recipes</p>
              </Link>
            </div>

            <div className="workoutLink">
              <Link to="/workouts">
                <img src={workoutDumbbell} className="sideMenuImage" />
                <p className="workouts">Workouts</p>
              </Link>
            </div>

            <div className="favoritesLink">
              <Link to="/favorites">
                <img src={favoriteRecipes} className="sideMenuImage" />
                <p className="favorites">Favorites</p>
              </Link>
            </div>

            <div className="progressLink">
              <Link to="/progress">
                <img src={progressClock} className="sideMenuImage" />
                <p className="progress">Progress</p>
              </Link>
            </div>

            <div className="dailyProgress">
              <DailyProgressCircle goal={goal} eat={eat} />
            </div>
          </div>
        </div>

        <div className="mainContent">
          <TopSearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            toggleMenu={toggleMenu}
          />
          <HomePageMiddleIntro />
        </div>
      </div>
      <Footer />
      <div className="copyRight">Fuel lean fitness. All Rights Reserved.</div>
    </>
  );
}

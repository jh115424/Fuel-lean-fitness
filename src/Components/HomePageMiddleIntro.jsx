import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NutritionalWheel from "./NutritionalWheel";
import TodaysWorkoutBox from "./TodaysWorkoutBox";
import Footer from "./Footer";
import "./homePageMiddleIntro.css";
import salmonMacroBowlHeader from "../assets/salmonMacroBowlHeader.webp";
import FeaturedHomePageMeals from "./FeaturedHomePageMeals";



export default function HomePageMiddleIntro() {
  const [carbs, getCarbs] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fats, getFats] = useState(0);
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <>
      <div className="middleContainer">
        <div className="heroRow">
          <div className="pageLogoAndImage">
            <p>
              Fuel Your Body. <br /> <span>Crush Your Goals.</span>
            </p>

            <h5>
              Low carb recipes and effective <br />
              workouts for a stronger you.
            </h5>

            <Link to="/recipes">
              <button type="button" className="recipeButton">
                Explore Recipes {" > "}
              </button>
            </Link>
          </div>

          <div className="homePageMainImage">
            <img src={salmonMacroBowlHeader} className="salmonBigBowl" alt="" />
          </div>

          <div className="macroOverview">
            <NutritionalWheel protein={30} carbs={50} fats={20} />
          </div>

          <TodaysWorkoutBox />
        </div>

        <FeaturedHomePageMeals />
    
      </div>
    </>
  );
}

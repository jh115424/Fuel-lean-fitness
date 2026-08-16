import { Link } from "react-router";
import "./workouts.css";
import { getWorkouts } from "../api";
import { useState, useEffect } from "react";
import blackWomanWorkingOut from "../assets/blackWomanWorkingOut.png";
import Footer from "./Footer";
import dashBoard from "../assets/dashBoard.png";

export default function Workouts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState("all");

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const types = [
          "cardio",
          "strength",
          "stretching",
          "powerlifting",
          "plyometrics",
          "strongman",
        ];
        const results = await Promise.all(types.map((t) => getWorkouts(t)));
        const combined = results.flat();
        setData(combined);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadWorkouts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const filteredWorkouts = data.filter((item) => {
    if (type === "all") return true;

    return item.type === type;
  });

  return (
    <>
      <div className="workoutsContainer">
           <Link to="/home" className="homeLink">
          <button type="button" className="homePageButton">
            <img src={dashBoard} className="goHome" />
          </button>
        </Link>
        <div className="workoutsBanner">
          
          <div className="bannerLabel">
            TODAY
            <header className="exerciseTitle">Push Day - Chest and Abs</header>
          </div>
          <img
            src={blackWomanWorkingOut}
            className="bannerImage"
            alt="workout"
          />
        </div>

        <div className="workoutSelectionBtns">
          <button
            onClick={() => setType("all")}
            className={
              type === "all"
                ? "workoutBtnAll workoutBtnActive"
                : "workoutBtnAll"
            }
          >
            All
          </button>
          <button
            onClick={() => setType("strength")}
            className={
              type === "strength" ? "strength activeClass" : "strength"
            }
          >
            Strength
          </button>
          <button
            onClick={() => setType("cardio")}
            className={type === "cardio" ? "cardio activeClass" : "cardio"}
          >
            Cardio
          </button>
          <button
            onClick={() => setType("stretching")}
            className={
              type === "stretching" ? "stretching activeClass" : "stretching"
            }
          >
            Stretching
          </button>
          <button
            onClick={() => setType("powerlifting")}
            className={
              type === "powerlifting" ? "powerlifting active" : "powerlifting"
            }
          >
            Powerlifting
          </button>
          <button
            onClick={() => setType("plyometrics")}
            className={
              type === "plyometrics" ? "plyometrics active" : "plyometrics"
            }
          >
            Plyometrics
          </button>
        </div>

        <div className="workoutsList">
          {filteredWorkouts.map((item, index) => {
            console.log(item);
            return (
              <div className="workoutCard" key={index}>
                <p className="workoutName">
                  EXERCISE TYPE: <br />
                  {item.name}
                </p>
                <p className="workoutType">CATEGORY: {item.type}</p>
                <p className="workoutDifficulty">
                  DIFFICULTY: {item.difficulty}
                </p>
                <span className={`difficultyBadge ${item.difficulty}`}>
                  {item.difficulty}
                </span>
                <hr className="cardDivider" />
                <p className="workoutMuscle">MUSCLE GROUP: {item.muscle}</p>
                <p className="workoutEquipment">
                  EQUIPMENT TYPE:{" "}
                  {item.equipments &&
                    item.equipments.map((eq, i) => (
                      <span className="equipmentTag" key={i}>
                        {eq}
                      </span>
                    ))}
                </p>
                <div className="instructions">
                  Workout Instructions
                  <p className="workoutInstructions">{item.instructions}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
            <div className="copyRight">Fuel lean fitness. All Rights Reserved.</div>
    </>
  );
}

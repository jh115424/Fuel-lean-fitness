// import React from "react";
import "./workouts.css";
import { getWorkouts } from "../api";
import { useState, useEffect } from "react";
import blackWomanWorkingOut from "../assets/blackWomanWorkingOut.png";

export default function Workouts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState("all");

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await getWorkouts(type);
        setData(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadWorkouts();
  }, [type]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const filteredWorkouts = data.filter((item) => {
    if (type === "all") return true;

    return item.type === type;
  });

  return (
    <>
      <div className="workoutsContainer">
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
                <p className="workoutName">{item.name}</p>
                <p className="workoutType">{item.type}</p>
                <p className="workoutDifficulty"> {item.difficulty}</p>
                <p className="workoutMuscle">{item.muscle}</p>
                <p className="workoutEquipment">{item.equipments}</p>
                <div className="instructions">
                  Workout Instructions
                  <p className="workoutInstructions">{item.instructions}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

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
        const response = await getWorkouts();
        setData(response);
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
        <div className="workoutsBanner">
          <p className="bannerLabel">
            TODAY
            <header className="exerciseTitle">Push Day - Chest and Abs</header>
          </p>
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
          <button onClick={() => setType("strength")} className={type === "strength" ? }>
            Strength
          </button>
          <button onClick={() => setType("cardio")} className="cardioButton">
            Cardio
          </button>
          <button
            onClick={() => setType("stretching")}
            className="stretchButton"
          >
            Stretching
          </button>
          <button
            onClick={() => setType("powerlifting")}
            className="powerlifting"
          >
            Powerlifting
          </button>
          <button
            onClick={() => setType("plyometrics")}
            className="plyometricsButton"
          >
            Plyometrics
          </button>
        </div>
      </div>
    </>
  );
}

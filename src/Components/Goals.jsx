import "./goals.css";
import { useState } from "react";

export default function Goals() {
  const [calories, setCalories] = useState(2200);
  const [protein, setProtein] = useState(150);
  const [carbs, setCarbs] = useState(200);
  const [fat, setFat] = useState(70);
  const [goalType, setGoalType] = useState("Cut");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="goalsContainer">
        <p className="goalsTitle">MY GOALS</p>

        <div className="goalType">
          <div className="goalRow">
            <p className="title">Calories</p>

            {isEditing ? (
              <input
                id="calories"
                type="number"
                value={calories}
                onChange={(e) => {
                  setCalories(e.target.value);
                }}
              />
            ) : (
              <p className="macro">{calories}</p>
            )}
          </div>
          <div className="goalRow">
            <p className="title">Protein</p>
            {isEditing ? (
              <input
                id="protein"
                type="number"
                value={protein}
                onChange={(e) => {
                  setProtein(e.target.value);
                }}
              />
            ) : (
              <p className="macro">{protein}</p>
            )}
          </div>

          <div className="goalRow">
            <p className="title">Carbs</p>
            {isEditing ? (
              <input
                id="carbs"
                type="number"
                value={carbs}
                onChange={(e) => {
                  setCarbs(e.target.value);
                }}
              />
            ) : (
              <p className="macro">{carbs}</p>
            )}
          </div>

          <div className="goalRow">
            <p className="title">Fat</p>
            {isEditing ? (
              <input
                id="fat"
                type="number"
                value={fat}
                onChange={(e) => {
                  setFat(e.target.value);
                }}
              />
            ) : (
              <p className="macro">{fat}</p>
            )}
          </div>

          <div className="goalRow">
            <p className="title">Goal type</p>
            {isEditing ? (
              <select
                id="goalType"
                value={goalType}
                onChange={(e) => setGoalType(e.target.value)}
                className="cardTypeBox"
                required
              >
                <option value="">Select Fitness Goals</option>
                <option value="Cut">Cut</option>
                <option value="Bulk">Bulk</option>
                <option value="Maintain">Maintain</option>
              </select>
            ) : (
              <p className="greenFlip">{goalType}</p>
            )}
          </div>
        </div>
        <div className="goalButtons">
          <button className="edit" onClick={() => setIsEditing(true)}>Edit goals</button>
          <button className="save" onClick={() => setIsEditing(false)}>Save</button>
        </div>
      </div>
    </>
  );
}

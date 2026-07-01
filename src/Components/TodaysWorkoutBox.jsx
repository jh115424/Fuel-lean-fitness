import "./todaysWorkoutBox.css";
import { Link } from "react-router-dom";

export default function TodaysWorkoutBox() {
  return (
    <div className="todaysWorkoutBreakdown">
      <p className="imageTitle">Today's Workout</p>

      <div className="breakdownWrapper">
        <ul>
          <h4>Push Day</h4>
          <li>Tricep Dips</li>
          <li>Shoulder Press</li>
          <li>Bicep Curls</li>
        </ul>
        <Link to="/workouts">
          <button className="startButton">Start Workout</button>
        </Link>
      </div>
    </div>
  );
}

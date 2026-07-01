import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from "react-circular-progressbar";

import "./dailyProgressCircle.css";

export default function DailyProgressCircle({ goal, eat }) {
  const percent = (eat / goal) * 100;
  return (
    <>
      <div className="progressCircleStylingDiv">
        <div className="progressWrapper">
          <h4>Daily Progress</h4>
          <CircularProgressbar
            value={percent}
            text={`${Math.round(percent)}%`}
          />
          <p>Goal: {goal}</p>
          <p>Eaten: {eat}cal</p>
        </div>
      </div>
    </>
  );
}

import { Link } from "react-router";
import { useEffect, useState } from "react";
import "./progress.css";
import { startOfWeek, endOfWeek } from "date-fns";

export default function Progress() {
  const [progress, setProgress] = useState("");
  const [loading, setLoading] = useState(true);
  const currentDate = new Date();

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 3 }); // Starts on Monday (1)
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 3 });

  return (
    <>
      <div className="progressPageWrapper">
        <div className="header">
          <header>Progress</header>

          <div className="weekDisplay">
            <p>
              Week of{" "}
              {weekStart.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              -{" "}
              {weekEnd.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
            <p></p>
          </div>
        </div>

        <div className="progressBoxesContainer">
            <div className="statBoxOne"></div>
            <div className="statBoxTwo"></div>
            <div className="statBoxThree"></div>
        </div>
      </div>
    </>
  );
}

/*useState
useEffect
localStorage
JSON.parse
JSON.stringify
map()
filter()
reduce()
recharts
LineChart
BarChart
XAxis
YAxis
ResponsiveContainer*/

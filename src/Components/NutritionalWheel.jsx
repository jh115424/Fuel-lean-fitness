import "./nutritionalWheel.css";
import { PieChart, Pie, Cell } from "recharts";

export default function NutritionalWheel({ protein, carbs, fats }) {
console.log({ carbs, protein, fats });

  return (
    <>
      <div className="macroWheelBreakdown">
        <div className="macroPieWrapper">
          <h4>Macros Overview</h4>

          <PieChart width={160} height={160} className="actualWheel">
            <Pie
              data={[
                { name: "Carbs", value: carbs },
                { name: "Protein", value: protein },
                { name: "Fats", value: fats },
              ]}
              dataKey="value"
              outerRadius={70}
              innerRadius={60}
            >
              <Cell fill="skyblue" />
              <Cell fill="red" />
              <Cell fill="orange" />
            </Pie>
          </PieChart>
        </div>

        <div className="macroBreakdown">
          <p>
            <span className="dot carb"></span>Carbs: {carbs}
          </p>

          <p>
            <span className="dot protein"></span>Protein: {protein}
          </p>

          <p>
            <span className="dot fats"></span>Fats: {fats}
          </p>
        </div>
      </div>
    </>
  );
}

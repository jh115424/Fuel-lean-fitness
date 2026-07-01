import { PieChart, Pie, Cell, XAxis, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import { BarChart, Bar } from "recharts";
import "./weeklyCaloriesChart.css";

const colorChart = [
  "#bfdbfe",
  "#1e40af",
  "#93c5fd",
  "#1d4ed8",
  "#2563eb",
  "#60a5fa",
  "#3b82f6",
];

const weeklyData = [
  { day: "M", calories: 2100 },
  { day: "T", calories: 1750 },
  { day: "Wed", calories: 1823 },
  { day: "Th", calories: 1255 },
  { day: "Fri", calories: 2310 },
  { day: "Sat", calories: 1550 },
  { day: "Sun", calories: 1600 },
];

export default function WeeklyCaloriesChart() {
  return (
    <>
   jsx<div className="weeklyCalorieBarContainer">
  <div className="weeklyBarWrapper">
    <h4 className="barGraphTitle">WeeklyCalories</h4>
    <ResponsiveContainer width="100%" height={150}>
      <BarChart
        className="barChartGraph"
        data={weeklyData}
        width={800}
        height={150}
      >
        <Bar dataKey="calories">
          {weeklyData.map((day, index) => (
            <Cell key={day.day} fill={colorChart[index]} />
          ))}
        </Bar>
        <XAxis dataKey="day"></XAxis>
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>
    </>
  );
}

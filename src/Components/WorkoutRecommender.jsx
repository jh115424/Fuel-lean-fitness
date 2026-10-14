import { useState } from "react";
import { askAI } from "../api";
import "./workoutRecommender.css";

export default function WorkoutRecommender() {
  const [workoutType, setWorkoutType] = useState("strength");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const goals = JSON.parse(localStorage.getItem("goals")) || null;

  const handleRecommend = async () => {
    setLoading(true);
    setError("");
    setRecommendation("");

 const goalInfo = goals
  ? `- Fitness goal: ${goals.goalType}`
  : "- No specific fitness goal set";

const prompt = `You are creating a personalized ${workoutType} workout. Here are the user's details:
${goalInfo}

Create a 45 minute ${workoutType} workout routine.

For each exercise use this exact format:
**[Exercise name]**
Sets: [number]
Reps: [number or range]
Rest: [rest time between sets]
Tip: [one practical coaching tip]

Include 5-6 exercises total. At the end add a brief note explaining how this workout supports the user's ${goals ? goals.goalType : "fitness"} goal.

Keep the language clear and motivating.`;

    try {
      const data = await askAI(prompt);
      if (data.response) {
        setRecommendation(data.response);
      } else {
        setError("No response from AI. Try again.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="workoutRecommenderContainer">
      <h3 className="workoutRecommenderTitle">AI Workout Recommender</h3>
      <div className="workoutTypeSelector">
        <label className="workoutLabel">Select workout type:</label>
        <select
          className="workoutSelect"
          value={workoutType}
          onChange={(e) => setWorkoutType(e.target.value)}
        >
          <option value="strength">Strength</option>
          <option value="cardio">Cardio</option>
          <option value="stretching">Stretching</option>
          <option value="powerlifting">Powerlifting</option>
          <option value="plyometrics">Plyometrics</option>
        </select>
      </div>
      {goals && (
        <p className="workoutGoalInfo">
          Goal: <span>{goals.goalType}</span>
        </p>
      )}
      <button
        className="workoutRecommendButton"
        onClick={handleRecommend}
        disabled={loading}
      >
        {loading ? "Getting recommendation..." : "Get Workout Recommendation"}
      </button>
      {error && <p className="workoutError">{error}</p>}
      {recommendation && (
        <div className="workoutResponse">
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
}
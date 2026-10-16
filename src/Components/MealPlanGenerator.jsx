import { useState } from "react";
import { askAI, saveAIResponse, getUserIdFromToken } from "../api";
import "./mealPlanGenerator.css";

export default function MealPlanGenerator() {
  const [goals] = useState(JSON.parse(localStorage.getItem("goals")) || null);
  const [mealPlan, setMealPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   const savedGoals = JSON.parse(localStorage.getItem("goals"));
  //   if (savedGoals) {
  //     setGoals(savedGoals);
  //   }
  // }, [setGoals]);

  const handleGenerate = async () => {
    if (!goals) {
      setError("Please set your goals in the Dashboard first.");
      return;
    }

    setLoading(true);
    setError("");
    setMealPlan("");

    const prompt = `You are creating a personalized meal plan. Here are the user's details:
- Goal type: ${goals.goalType}
- Daily calorie target: ${goals.calories} calories
- Daily protein target: ${goals.protein}g protein
- Daily carb target: ${goals.carbs}g carbs
- Daily fat target: ${goals.fats}g fats

Create a full day meal plan with breakfast, lunch, dinner and one snack.

For each meal use this exact format:
**[Meal name]**
Meal: [name of the dish]
Calories: [amount] cal
Protein: [amount]g
Carbs: [amount]g
Fats: [amount]g
Why it fits: [one sentence explaining why this meal suits their goal]

At the end add a daily totals section showing total calories, protein, carbs and fats for all meals combined.

Keep meals practical and easy to make with common ingredients.`;

    try {
      const data = await askAI(prompt);
      if (data.response) {
        setMealPlan(data.response);

        const userId = getUserIdFromToken();
        if (userId) {
          saveAIResponse(userId, "meal-plan", prompt, data.response);
        }
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
    <div className="mealPlanContainer">
      <h3 className="mealPlanTitle">AI Meal Plan Generator</h3>
      {goals ? (
        <div className="mealPlanGoalsSummary">
          <p>
            Goal: <span>{goals.goalType}</span>
          </p>
          <p>
            Calories: <span>{goals.calories}</span>
          </p>
          <p>
            Protein: <span>{goals.protein}g</span>
          </p>
        </div>
      ) : (
        <p className="mealPlanNoGoals">
          No goals set. Go to Dashboard to set your goals.
        </p>
      )}
      <button
        className="mealPlanButton"
        onClick={handleGenerate}
        disabled={loading || !goals}
      >
        {loading ? "Generating..." : "Generate My Meal Plan"}
      </button>
      {error && <p className="mealPlanError">{error}</p>}
      {mealPlan && (
        <div className="mealPlanResponse">
          <p>{mealPlan}</p>
        </div>
      )}
    </div>
  );
}

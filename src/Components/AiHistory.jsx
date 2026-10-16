import { useState, useEffect } from "react";
import { getAIHistory, getUserIdFromToken } from "../api";
import "./aiHistory.css";
import { Link } from "react-router-dom";
import dashboard from "../assets/dashBoard.png";
import Footer from "./Footer";

export default function AiHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadHistory = async () => {
      const userId = getUserIdFromToken();
      if (!userId) {
        setError("You must be logged in to view history.");
        setLoading(false);
        return;
      }

      try {
        const data = await getAIHistory(userId);
        if (data.history) {
          setHistory(data.history);
        } else {
          setError("Could not load history.");
        }
      } catch {
        setError("Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const filteredHistory = history.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <p className="aiHistoryLoading">Loading history...</p>;
  if (error) return <p className="aiHistoryError">{error}</p>;

  return (
    <div className="aiHistoryPage">
      <div className="aiHistoryContainer">
        <h2 className="aiHistoryTitle">My AI History</h2>
        <p className="aiHistorySubtitle">Your saved meal plans and workouts</p>

        <div className="aiHistoryFilters">
          <button
            className={filter === "all" ? "aiFilterBtn active" : "aiFilterBtn"}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={
              filter === "meal-plan" ? "aiFilterBtn active" : "aiFilterBtn"
            }
            onClick={() => setFilter("meal-plan")}
          >
            Meal Plans
          </button>
          <button
            className={
              filter === "workout" ? "aiFilterBtn active" : "aiFilterBtn"
            }
            onClick={() => setFilter("workout")}
          >
            Workouts
          </button>
        </div>

        {filteredHistory.length === 0 ? (
          <p className="aiHistoryEmpty">
            No history found. Generate a meal plan or workout to get started.
          </p>
        ) : (
          <div className="aiHistoryList">
            {filteredHistory.map((item) => (
              <div className="aiHistoryCard" key={item._id}>
                <div className="aiHistoryCardHeader">
                  <span className={`aiHistoryType ${item.type}`}>
                    {item.type === "meal-plan" ? "🍽 Meal Plan" : "💪 Workout"}
                  </span>
                  <span className="aiHistoryDate">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
                <div className="aiHistoryResponse">
                  <p>{item.response}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="dashBoardLink">
        <Link to="/dashboard" className="dashBoardPage">
          <img src={dashboard} className="sideMenuImage" />
          <p className="dashBoard">Dashboard</p>
        </Link>
      </div>
      <Footer />
      <div className="copyRightFour">
        Fuel lean fitness. All Rights Reserved.
      </div>
    </div>
  );
}

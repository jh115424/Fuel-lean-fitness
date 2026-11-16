export const getRecipes = async () => {
  const res = await fetch(
    "https://api.spoonacular.com/recipes/complexSearch?number=20&addRecipeNutrition=true&addRecipeInstructions=true&apiKey=e1c00f86d237464d96be3204b2d22468",
  );
  const data = await res.json();
  return data;
};

export const getWorkouts = async (muscle = "") => {
  const url = muscle
    ? `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`
    : `https://api.api-ninjas.com/v1/exercises`;

  const res = await fetch(url, {
    headers: {
      "X-Api-Key": "hUydRWdF9Y70wwgu2FW2KSVjDf1kdLfTdWfUh9du",
    },
  });
  const data = await res.json();
  return data;
};

export const askAI = async (prompt) => {
  const res = await fetch("http://localhost:5001/api/ai/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const data = await res.json();
  return data;
};

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.id;
};

export const saveAIResponse = async (userId, type, prompt, response) => {
  await fetch("http://localhost:5001/api/ai/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, type, prompt, response }),
  });
};
export const getAIHistory = async (userId) => {
  const res = await fetch(`http://localhost:5001/api/ai/history/${userId}`);
  const data = await res.json();
  return data;
};

export const loginUser = async (email, password) => {
  const res = await fetch("http://localhost:5001/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  return data;
};

export const registerUser = async (name, email, password) => {
  const res = await fetch("http://localhost:5001/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  return data;
};

export const askAIStream = (prompt, onChunk, onDone) => {
  const eventSource = new EventSource(
    `http://localhost:5001/api/ai/stream?prompt=${encodeURIComponent(prompt)}`,
  );

  eventSource.onmessage = (e) => {
    if (e.data === "[DONE]") {
      eventSource.close();
      onDone();
    } else {
      onChunk(e.data);
    }
  };

  eventSource.onerror = () => {
    eventSource.close();
    onDone();
  };
};

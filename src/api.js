export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch {
    return null;
  }
};


export const getRecipes = async () => {
  const res = await fetch(
    "https://api.spoonacular.com/recipes/complexSearch?number=20&addRecipeNutrition=true&addRecipeInstructions=true&apiKey=e1c00f86d237464d96be3204b2d22468",
  );
  const data = await res.json();
  return data;
};

export const getWorkouts = async (type = "", muscle = "") => {
  const params = new URLSearchParams();
  if (type && type !== "all") params.append("type", type);
  if (muscle) params.append("muscle", muscle);

  const url = `https://api.api-ninjas.com/v1/exercises${params.toString() ? "?" + params.toString() : ""}`;
  console.log(url);

  const res = await fetch(url, {
    headers: {
      "X-Api-Key": "hUydRWdF9Y70wwgu2FW2KSVjDf1kdLfTdWfUh9du",
    },
  });
  const data = await res.json();
  return Array.isArray(data) ? data : [];
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

export const loginUser = async (email, password) => {
  const res = await fetch("http://localhost:5001/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
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

export const askAIStream = (prompt, onChunk, onDone) => {
  fetch("http://localhost:5001/api/ai/stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  }).then((res) => {
    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    const read = () => {
      reader.read().then(({ done, value }) => {
        if (done) {
          onDone();
          return;
        }

        const text = decoder.decode(value);
        const lines = text.split("\n");

        lines.forEach((line) => {
          if (line.startsWith("data: ")) {
            const data = line.replace("data: ", "");
            if (data === "[DONE]") {
              onDone();
            } else if (data.trim()) {
              onChunk(data);
            }
          }
        });

        read();
      });
    };

    read();
  });
};


export const saveAIResponse = async (userId, type, prompt, response) => {
  const res = await fetch("http://localhost:5001/api/ai/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, type, prompt, response }),
  });
  const data = await res.json();
  return data;
};

export const getAIHistory = async (userId) => {
  const res = await fetch(`http://localhost:5001/api/ai/history/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data;
};
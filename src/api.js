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














// export const getWorkouts = async (type = "", muscle = "") => {
//   const params = new URLSearchParams();
//   if (type && type !== "all") params.append("type", type);
//   if (muscle) params.append("muscle", muscle);
  
//   const url = `https://api.api-ninjas.com/v1/exercises${params.toString() ? "?" + params.toString() : ""}`;
//   console.log(url);

//   const res = await fetch(url, {
//     headers: {
//       "X-Api-Key": "hUydRWdF9Y70wwgu2FW2KSVjDf1kdLfTdWfUh9du",
//     },
//   });
//   const data = await res.json();
//   return data;
// };
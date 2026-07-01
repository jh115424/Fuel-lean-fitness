import { useState, useEffect } from "react";
import { getRecipes } from "../api";
import "./suggestedRecipe.css";

export default function SuggestedRecipe() {
  // const [suggestedRecipe, setSuggestedRecipe] = useState(null)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  // dummy placeholder code for styling 

  const [suggestedRecipe, setSuggestedRecipe] = useState({
  image: "https://picsum.photos/seed/meal1/300/200",
  title: "Grilled Chicken Bowl",
  nutrition: {
    nutrients: [
      { name: "Calories", amount: 480 },
      { name: "Protein", amount: 42 }
    ]
  }
});


// useEffect(() => {
//   const loadRecipes = async () => {
//     try{
//       const response = await getRecipes();
//       setSuggestedRecipe(response.results[Math.floor(Math.random() * response.results.length)]);
//     } catch ( err ) {
//       setError (err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
// loadRecipes();
// }, []);

  if (loading) return <p>Adding...</p>;
  if ( error) return <p>Error: {error} </p>;
  // if (!suggestedRecipe) return null;

  return <>
  
  <div className="suggestedRecipeContainer">
     <img className="suggestedRecipeImg" src={suggestedRecipe.image} alt={suggestedRecipe.title}/>
        <p className="suggestedRecipeTitle">SUGGESTED RECIPE</p>
        <p className="suggestedRecipeName">{suggestedRecipe.title}</p>
       
  </div>
  
  </>;
}

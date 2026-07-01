import FuelLeanLogin from "./Components/FuelLeanLogin.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import DashBoard from "./Components/DashBoard";
import Recipes from "./Components/Recipes.jsx";
import Workouts from "./Components/Workouts.jsx";
import Favorites from "./Components/Favorites.jsx";
import Progress from "./Components/Progress.jsx";
import Legal from "./Components/Legal.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<FuelLeanLogin />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/" element={<FuelLeanLogin />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/workouts" element={<Workouts />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/progress" element={<Progress />} />
    </Routes>
  </BrowserRouter>,
);

import FuelLeanLogin from "./Components/FuelLeanLogin.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import DashBoard from "./Components/DashBoard";
import Recipes from "./Components/Recipes.jsx";
import Workouts from "./Components/Workouts.jsx";
import Favorites from "./Components/Favorites.jsx";
import Legal from "./Components/Legal.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<FuelLeanLogin />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/" element={<FuelLeanLogin />} />
      <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
      <Route path="/recipes" element={<ProtectedRoute><Recipes /></ProtectedRoute>} />
      <Route path="/workouts" element={<ProtectedRoute><Workouts /></ProtectedRoute>} />
      <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
    </Routes>
  </BrowserRouter>,
);
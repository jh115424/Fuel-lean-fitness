import "./fuelLeanLogin.css";
import { useState } from "react";
import dumbbell from "../assets/dumbbell-xxl.png";
import { useNavigate } from "react-router-dom";
import { getRecipes } from "../api";

export default function FuelLeanLogin() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    navigate("/home");
  };

  return (
    <>
      <div className="topFuelLogo">
        <img src={dumbbell} className="smallerTopLogo" />
      </div>
      <div className="loginPageBody">
        <div className="userNameAndPassword">
          <span className="titleLink">
            <img src={dumbbell} className="fuelLogo" />
            Fuel Lean Fitness
          </span>
          <h2 className="welcome">Welcome back.</h2>
          <p className="loginMotto">Track your macros. Own your goals.</p>

          <form onSubmit={handleSubmit} className="login-form">
            {isRegistering && (
              <>
                <div className="sideOneBox">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    required
                  />
                </div>
                <div className="sideTwoBox">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    required
                  />
                </div>
              </>
            )}
            <div className="sideOneBox">
              <input
                className="emailBox"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
              />
            </div>
            <div className="sideTwoBox">
              <input
                className="passwordBox"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
              />
            </div>
            <span
              className="showHideToggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
            {error && <p className="errorMessage">{error}</p>}
            <button type="submit" disabled={loading} className="submitButton">
              {loading ? "Signing in..." : "Sign in"}
            </button>
            <p className="signInQuestion">
              New member{"? "}
              <span
                onClick={() => setIsRegistering(!isRegistering)}
                className="create"
              >
                &nbsp;
                {isRegistering ? "Back to login" : "Create account"}
              </span>
            </p>
          </form>
        </div>

        <div className="macroTeaser">
          <div className="todaysMac">
            <p>
              Todays Macros <br />{" "}
              <span>
                1,762
                <span>/ 2,200 kcal</span>
              </span>
            </p>
          </div>

          <div className="macBreakdown">
            <div className="proteinBox">
              <p>
                PROTEIN <br /> <span>187g</span>
              </p>
            </div>

            <div className="carbBox">
              <p>
                CARBS <br />
                <span>75g</span>
              </p>
            </div>

            <div className="fatBox">
              <p>
                FATS <br />
                <span>126</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="copyRight">Fuel lean fitness. All Rights Reserved.</div>
    </>
  );
}

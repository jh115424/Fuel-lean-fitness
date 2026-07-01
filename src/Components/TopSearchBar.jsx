import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import me from "../assets/me.jpg";
import "./topSearchBar.css";

// import { getWorkouts} from "../api";

export default function TopSearchBar({
  toggleMenu,
  searchText,
  setSearchText,
}) {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotifications] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const clickToggle = () => {
    if (isVisible) {
      setIsVisible(false);
    } else {
      setMessage("Here is your fitness notification message!");
      setIsVisible(true);
      setHasUnreadNotifications(false);
    }
  };

  const logoutToggle = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };
  return (
    <div className="topHeaderSearch">
      <div className="leftGroup">
        <div className="hamburger-icon" onClick={toggleMenu}>
          <FaBars />
        </div>

        <div className="searchBar">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search recipes, workouts, meal plans..."
          />
          <FaMagnifyingGlass className="magnifying-icon" />
        </div>
      </div>

      <div className="rightGroup">
        <div className="notification-bell" onClick={clickToggle}>
          {isVisible && (
            <div className="notification-box">
              <p>{message}</p>
            </div>
          )}

          {hasUnreadNotification && <div className="red-dot"></div>}

          <FaBell />
        </div>

        <div className={`logoutImage ${isProfileMenuOpen ? "" : "closed"}`}>
          <img src={me} className="myLoginImage" onClick={logoutToggle} />
          <span className="dropdown-arrow" onClick={logoutToggle}>⌄</span>

          {isProfileMenuOpen && (
            <div className="legal-verbiage">
              <Link to="/legal" onClick={() => setIsProfileMenuOpen(false)}>
                Legal
              </Link>
            </div>
          )}

          {isProfileMenuOpen && (
            <div className="logout-box">
              <Link to="/login" onClick={() => setIsProfileMenuOpen(false)}>
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

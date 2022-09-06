import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import profileButton from "./profileButton.png";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  // console.log("user in Profile Button", user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      {/* <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
        <img src={profileButton} alt={"profile-button"} />
      </button> */}
      <div onClick={openMenu}>
        <img src={profileButton} alt={"profile-button"} />
      </div>

      {showMenu && (
        <div>
          <ul className="profile-dropdown">
            <li>username: {user.username}</li>
            <li>user email:{user.email}</li>
            {/* <li>
              <button onClick={logout}>Log Out</button>
            </li> */}
          </ul>

          <div onClick={() => history.push("/spots/current")}>
            Your Listings
          </div>
          <div onClick={() => history.push("/reviews/current")}>
            Your Reviews
          </div>
          <div className="profile-log-out" onClick={logout}>
            Log Out
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;

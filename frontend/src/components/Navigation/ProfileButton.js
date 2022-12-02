import React, { useState, useEffect } from "react";
import { Modal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import profileButton from "./profileButton.png";
import { Redirect, useHistory } from "react-router-dom";
import "./ProfileButton.css";
import CreateSpotForm from "../CreateASpotModal/createSpotForm";
import { logoutBookingsThunk } from "../../store/bookings";
import { logoutReviewsThunk } from "../../store/reviews";
import { cleanUpAllSpots } from "../../store/spots";

function ProfileButton({ user }) {
  // console.log("user in Profile Button", user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  // const [showModal, setShowModal] = useState(false);
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
    //need to clear private state
    // by calling thunks here for reviews, listing and bookings
    dispatch(logoutBookingsThunk, logoutReviewsThunk, cleanUpAllSpots);
    // return <Redirect to="/" />;
    history.push("/");
  };
  if (!sessionUser) {
    return Redirect("/");
  }
  return (
    <>
      <div onClick={openMenu} className="dropdown-menu">
        <img
          id="profile-avatar-dropdown"
          src={profileButton}
          alt={"profile-button"}
        />
      </div>

      {showMenu && (
        <div className="dropdown-content">
          {/* <ul className="profile-dropdown">
            <li>Hi {user.username}</li>
            <li>{user.email}</li>
          </ul> */}
          {/* <div>Hi {user.username}</div> */}
          <div
            className="your-listing"
            onClick={() => history.push("/spots/current")}
          >
            Your Listings
          </div>
          <div
            className="your-review"
            onClick={() => history.push("/reviews/current")}
          >
            Your Reviews
          </div>
          <div
            onClick={() => history.push("/bookings")}
            className="your-listing"
          >
            Your Bookings
            
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

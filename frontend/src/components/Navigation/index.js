import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import DemoUserModal from "../DemoUserModal";
import "./Navigation.css";
import logo from "./logo.png";
import CreateASpotModal from "../CreateASpotModal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="session-links">
        <CreateASpotModal />
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className="session-links">
        <LoginFormModal />
        <SignupFormModal />
        {/* <DemoUserModal /> */}
        {/* <NavLink to="/signup">Sign Up</NavLink> */}
      </div>
    );
  }
  const history = useHistory();
  const goToCreateASpot = (e) => {
    e.preventDefault();
    setShowModal(true);
    // history.push("/spots/new");
  };

  return (
    <div className="outer-nav">
      <div className="nav-container">
        <div className="home-logo-container">
          <NavLink exact to="/">
            <div>
              <img className="logo-anbnb" src={logo} alt={"anbnb-logo"} />
            </div>
          </NavLink>

          {/* <span>
            <svg width="16px" height="16px" style={{ display: "block" }}>
              <path
                d="m 8.002 0.25 a 7.77 7.77 0 0 1 7.748 7.776 a 7.75 7.75 0 0 1 -7.521 7.72 l -0.246 0.004 a 7.75 7.75 0 0 1 -7.73 -7.513 l -0.003 -0.245 a 7.75 7.75 0 0 1 7.752 -7.742 Z m 1.949 8.5 h -3.903 c 0.155 2.897 1.176 5.343 1.886 5.493 l 0.068 0.007 c 0.68 -0.002 1.72 -2.365 1.932 -5.23 Z m 4.255 0 h -2.752 c -0.091 1.96 -0.53 3.783 -1.188 5.076 a 6.257 6.257 0 0 0 3.905 -4.829 Z m -9.661 0 h -2.75 a 6.257 6.257 0 0 0 3.934 5.075 c -0.615 -1.208 -1.036 -2.875 -1.162 -4.686 l -0.022 -0.39 Z m 1.188 -6.576 l -0.115 0.046 a 6.257 6.257 0 0 0 -3.823 5.03 h 2.75 c 0.085 -1.83 0.471 -3.54 1.059 -4.81 Z m 2.262 -0.424 c -0.702 0.002 -1.784 2.512 -1.947 5.5 h 3.904 c -0.156 -2.903 -1.178 -5.343 -1.892 -5.494 l -0.065 -0.007 Z m 2.28 0.432 l 0.023 0.05 c 0.643 1.288 1.069 3.084 1.157 5.018 h 2.748 a 6.275 6.275 0 0 0 -3.929 -5.068 Z"
                fill="black"
              ></path>
            </svg>
          </span> */}
        </div>
        <div className="nav-welcome">Welcome to AnBnB</div>
        <div className="right-nav">
          <div className="host-your-spot">
            {/* <span className="create_a_spot" onClick={goToCreateASpot}>
              Host your place
            </span>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <CreateASpot />
              </Modal>
            )} */}

            <div className="profile_button">{isLoaded && sessionLinks}</div>
          </div>
        </div>

        {/* <div className="search_bar"> */}
        {/* <form>
          <input type="text" placeholder="Hawaii?" />
        </form> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Navigation;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import "./SignupForm.css";

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setSubmitted(true);
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          email,
          username,
          password,
          firstName,
          lastName,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="welcome-signup">
        <div className="welcome-signup-text">Welcome to AnBnB</div>
      </div>
      <div className="signup-text-container">
        <div className="text-signup">Sign up</div>
      </div>
      <div className="signup-container">
        <ul className="signup-errors">
          {submitted && errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="signup-body">
          <div className="input-field">
            <label className="input">
              First Name
              <input
                className="credential"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label className="input">
              Last Name
              <input
                className="credential"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            <label className="input">
              Email
              <input
                className="credential"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="input">
              Username
              <input
                className="credential"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label className="input">
              Password
              <input
                className="credential"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label className="input">
              Confirm Password
              <input
                className="credential"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
          </div>

          {/* <button
            className="signup-button"
            type="submit"
            disabled={submitted && errors.length > 0}
          >
            Sign Up
          </button> */}
          <button
            className="button-signup"
            type="submit"
            disabled={submitted && errors.length > 0}
          >
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
}

export default SignupForm;

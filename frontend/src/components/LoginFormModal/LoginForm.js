import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import logo from "./anbnb2.png";
function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let errors = [];
    if (credential.length < 1)
      errors.push("Please enter your username or email");
    if (password.length < 1) errors.push("Please enter your password");

    setErrors(errors);
  }, [credential, password]);
  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        // console.log("Login errors: ", data.errors);
      }
    );
  };

  const demoUser = (e) => {
    e.preventDefault();
    return dispatch(
      sessionActions.login({ credential: "user1", password: "password1" })
    );
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="welcome-login">
        <div className="welcome-login-text">Welcome to AnBnB</div>
      </div>
      {/* <div>
        <img src={logo} />
      </div> */}
      <div className="login-text-container">
        <div className="text-login">Log in</div>
      </div>
      <div className="login-container">
        <ul>
          {submitted && errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>

        {/* <div className="x">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAASFBMVEX///8AAADX19fZ2dnT09PV1dXR0dHc3Nzn5+ff39+cnJxCQkKFhYXr6+tpaWljY2OWlpatra3ExMReXl4qKiqSkpJRUVF8fHyAHizaAAAE0UlEQVR4nO3c2XqbMBAFYJPFcfHedHn/N22F7dhGArTMdubLuatIE/0ZGYGCWK2+4yOb/nDcrbV7QZifu89Dv7n/u++GbPd6XSLNx68LqL81/O5uedPsF1nWX54rcdPd42Gkrh88l1F5emhxUMW3R86liMfOE/EJ2B2Gts/OEfEZ2H0OjbvOD3EE7HZD67pzQxwDb2fOrRdiBNxeD+zHB0AnjWgwdl9XNa/RIcQqRhXsXu8HYyJeFeMKvj4exq/ibAVD0Ikx8GX8JdjExQqGIBMzKhiCS8wE4hKzgaiTRjxNTAIxq1hQwRC8KhZVMAStioUVDMEiVgCxiFVAJGIlEIdYDUQhNgAxiMXTxHPsE5sqGGKd2FjBENvE5gqGWCaSAFPEd+qeVoYIaJdIBrQ6UAmBNomkQItEYqA9IjnQGpEBaIvIArREZALamRffuYBWiIzA1erFwEBlG6KX6BOZgfpEdqA2UQCoSxQBahKFgHpEMaDWvMg6D46jQRQFagzUrKcsKCNNFAdKExWAKSLfZ1EFKElUAqaIPGc3NaAUURGYmhfpifE8KAiUICoD+Qeq6hC9hJdoAMg7aZgAclbRCJCPqH6SuYeHGH9XNSAP0RQwNS+2dscYkJ5oDkjdJeEli7xQEk0CKU/uRoF0VTQLpKqiYSBNFQ1dyaTS3j3TFQxpJZoHtg5UAGAbEQLYQgQB1t9pxEAbz7EmUkeEqWBIDRGogiHlRKgKhpQS4YClREBgGRESWEIEBeYTYYG5RGBgHhEamEMEBy4T4YFLRAfAeaIL4BzRCXCa6AY4RXQETBNdAVPEsy9giugMuEyEBy4RTf1tojZzRBfAOaIT4DTRDXCK6AiYJroCrlbxRH/W7hJt3NfQ/efQ/bk0fvbNGXEa6ITo/rp06d4Cnuj+/tD9PX5qnUZq55tI0hhHxCmKG+L0/jYnxLkNfC6I8wgHxCUCPHEZAE7M6T40Me9JU2Bi7qO0sMT8Z4VBiSW72SCJZdv1AImlj7PDEcuf1wcj1mxIkHzfTXPqdlwAVbF2SwkMsX7PDAixZd8TBLFt7xr9vn7ytO4iNU9s3yZr8FUDj6HonmkizcN4hrc6U50JzVaR7nFKo1WknMtMEmknazNviLqH+rNjbl6kPzkYO924f0+U+3d9ce3CNkPku+UxQuTcR2+CyHvTaoDIfVeuTuRfdlAmSqyrqBJlFo4UiVIrY2pEue11SkTJtU0VouzircJSsfSPFCfK/06Ff6LGHbgoUWeJQZCoNT+JEfWuMYSImteJIkTda30Bovb9GjtRG8hO1AcyE20stTMSbQAZiRaG6FRPSIh2gExES0AWoi0gA9EakJxoD0hMjL/ZB11Pq0NIjOdBC0BColUgGdEukIhoGUhCtHItOpVmou0KhjQSrVcwpIlov4IhDUQMYAMRBVhNxAFWEpGAVUQsYAURDVhMxAMWEhGBRcQY+EOyp9XJJqICs4m4wEwiMjBryQwbmFFFdOBiFTGniefMEvErGDJD3LsApoj765GtD2CCuL20r70AE8T10LxzA4yJu6H16AcYEY9D49ERcLwL9TC0nTwBR8R+aNq4Aj6fOTeXppMr4COxvzVdiX/2c/8PKJvtCPi/qT8cT2u9LpHn7XT4e/ZSsO/8A6xxKQWc/fzUAAAAAElFTkSuQmCC" />
          </div> */}

        <div className="login-body">
          <div className="input-field">
            <label className="input">
              {/* Username or Email */}
              <input
                // id="credential"
                className="credential"
                type="text"
                value={credential}
                placeholder="Username or Email"
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="input-field">
            <label className="input">
              {/* Password */}
              <input
                className="credential"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          {/* <ul>
            {submitted &&
              errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul> */}
        </div>
      </div>
      <button
        className="login-button"
        type="submit"
        disabled={submitted && errors.length > 0}
      >
        Log In
      </button>
      <button onClick={demoUser} className="login-button">
        Demo User
      </button>
    </form>
  );
}

export default LoginForm;

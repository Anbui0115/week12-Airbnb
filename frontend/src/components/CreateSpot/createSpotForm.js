import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createASpotThunk } from "../../store/spots";
import { getAllSpotsThunk, addImgThunk } from "../../store/spots";
// import { useHistory } from "react-router-dom";
import "./CreateSpot.css";
function CreateSpotForm() {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const history = useHistory();
  // //errors
  const [validationErrors, setValidationErrors] = useState([]);

  // useEffect(() => {
  //   dispatch(getAllSpotsThunk());
  // }, [dispatch]);

  useEffect(() => {
    let errors = [];
    if (address.length < 10)
      errors.push("Street address needs to be at least 10 characters");
    if (city === "") errors.push("City is required");
    if (state === "") errors.push("State is required");
    if (country === "") errors.push("Country is required");
    if (lat === "") errors.push("Latitude is not valid");
    if (lng === "") errors.push("Longitude is not valid");
    if (name === "") errors.push("Name is required");
    if (name.length > 50) errors.push("Name must be less than 50 characters");
    if (description === "") errors.push("Description is required");
    if (price === "") errors.push("Price per day is required");
    if (imageUrl === "") errors.push("Image URL is required");
    if (
      !imageUrl.includes(".jpg") &&
      !imageUrl.includes(".png") &&
      !imageUrl.includes(".jpeg")
    ) {
      errors.push("Please provide a valid image ends with png, jpg, or jpeg");
    }

    //   //  if (
    //   //    !imageUrl.endsWith(".jpg") &&
    //   //    !imageUrl.endsWith(".png") &&
    //   //    !imageUrl.endsWith(".jpeg")
    //   //  ) {
    //   //    errors.push("Provide a valid image");
    //   //  }
    setValidationErrors(errors);
  }, [
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    imageUrl,
  ]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (validationErrors.length > 0) return;
    let spotInfo = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      // imageUrl,
    };
    // console.log("spotInfo inside Form", spotInfo);
    setValidationErrors([]);
    const data = await dispatch(createASpotThunk(spotInfo));
    // console.log("data````````````", data);
    dispatch(addImgThunk({ previewImage: true, url: imageUrl }, data.id));

    //need to redirect to the newly created spot
    history.push(`/spots/${data.id}`);
  };
  return (
    <form className="create-a-spot-form" onSubmit={onSubmit}>
      {/* <h1>Form</h1> */}
      <div className="welcome-create-a-spot">
        <div className="welcome-create-a-spot-text">Welcome to AnBnB</div>
      </div>
      <div className="become-a-host-container">
        <div className="become-a-host-text">Become a host</div>
      </div>
      <div className="create-a-spot-container">
        {isSubmitted && (
          <ul className="create-spot_error">
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <div className="create-spot-body">
          <div className="create-spot-input-items">
            <label className="create-spot-input-field">
              Name
              <input
                className="create-spot-input"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="create-spot-input-items">
            <label className="create-spot-input-field">
              Address
              <input
                className="create-spot-input"
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="create-spot-input-items">
            <label className="create-spot-input-field">
              City
              <input
                className="create-spot-input"
                type="text"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="create-spot-input-items">
            <label className="create-spot-input-field">
              State
              <input
                className="create-spot-input"
                type="text"
                name="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="create-spot-input-items">
            <label className="create-spot-input-field">
              Country
              <input
                className="create-spot-input"
                type="text"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="create-spot-input-items">
            <label className="create-spot-input-field">
              Latitude
              <input
                className="create-spot-input"
                type="number"
                name="lat"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="create-spot-input-items">
            <label className="create-spot-input-field">
              Longtitude
              <input
                className="create-spot-input"
                type="number"
                name="lng"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="create-spot-input-items">
            <label className="create-spot-input-field">
              Description
              <input
                className="create-spot-input"
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="create-spot-input-items">
            <label className="create-spot-input-field">
              Price
              <input
                className="create-spot-input"
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="create-spot-input-items">
            <label className="create-spot-input-field">
              Image URL
              <input
                className="create-spot-input"
                type="text"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </label>
          </div>
        </div>

        <button
          className="create-spot-modal-submit-button"
          type="submit"
          disabled={isSubmitted && validationErrors.length > 0}
        >
          Submit
        </button>
      </div>
      {/* </div> */}
    </form>

    // <form className="signup-form" onSubmit={handleSubmit}>
    //   <div className="welcome-signup">
    //     <div className="welcome-signup-text">Welcome to AnBnB</div>
    //   </div>
    //   <div className="signup-text-container">
    //     <div className="text-signup">Sign up</div>
    //   </div>
    //   <div className="signup-container">
    //     <ul>
    //       {submitted && errors.map((error, idx) => <li key={idx}>{error}</li>)}
    //     </ul>
    //     <div className="signup-body">
    //       <div className="input-field">
    //         <label className="input">
    //           First Name
    //           <input
    //             className="credential"
    //             type="text"
    //             value={firstName}
    //             onChange={(e) => setFirstName(e.target.value)}
    //             required
    //           />
    //         </label>
    //         <label className="input">
    //           Last Name
    //           <input
    //             className="credential"
    //             type="text"
    //             value={lastName}
    //             onChange={(e) => setLastName(e.target.value)}
    //             required
    //           />
    //         </label>
    //         <label className="input">
    //           Email
    //           <input
    //             className="credential"
    //             type="text"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //             required
    //           />
    //         </label>
    //         <label className="input">
    //           Username
    //           <input
    //             className="credential"
    //             type="text"
    //             value={username}
    //             onChange={(e) => setUsername(e.target.value)}
    //             required
    //           />
    //         </label>
    //         <label className="input">
    //           Password
    //           <input
    //             className="credential"
    //             type="password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             required
    //           />
    //         </label>
    //         <label className="input">
    //           Confirm Password
    //           <input
    //             className="credential"
    //             type="password"
    //             value={confirmPassword}
    //             onChange={(e) => setConfirmPassword(e.target.value)}
    //             required
    //           />
    //         </label>
    //       </div>

    //       {/* <button
    //         className="signup-button"
    //         type="submit"
    //         disabled={submitted && errors.length > 0}
    //       >
    //         Sign Up
    //       </button> */}
    //       <button
    //         className="button-signup"
    //         type="submit"
    //         disabled={submitted && errors.length > 0}
    //       >
    //         Sign Up
    //       </button>
    //     </div>
    //   </div>
    // </form>
  );
}
export default CreateSpotForm;

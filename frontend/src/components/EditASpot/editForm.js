import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllSpotsThunk } from "../../store/spots";
import { editASpotThunk } from "../../store/spots";
import { getSpotByIdThunk } from "../../store/spots";

function EditSpotForm() {
  const spots = useSelector((state) => state.spots);
  const { spotId } = useParams();
  // console.log("this is spots props", spots);
  const spot = spots[Number(spotId)];
  const dispatch = useDispatch();
  // if (!spot) {
  //   console.log("spot is undefined");
  // }

  // console.log("spot exist now", spot);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [address, setAddress] = useState("");
  // const [city, setCity] = useState("");
  // const [state, setState] = useState("");
  // const [country, setCountry] = useState("");
  // const [lat, setLat] = useState("");
  // const [lng, setLng] = useState("");
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [price, setPrice] = useState("");

  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [country, setCountry] = useState(spot?.country);
  const [lat, setLat] = useState(spot?.lat);
  const [lng, setLng] = useState(spot?.lng);
  const [name, setName] = useState(spot?.name);
  const [description, setDescription] = useState(spot?.description);
  const [price, setPrice] = useState(spot?.price);

  //errors
  const [validationErrors, setValidationErrors] = useState([]);
  const [imageUrl, setImageUrl] = useState(spot?.previewImage);
  const history = useHistory();

  // useEffect(() => {
  //   if (spot) {
  //     setAddress(spot.address);
  //     setCity(spot.city);
  //     setState(spot.state);
  //     setCountry(spot.country);
  //     setLat(spot.lat);
  //     setLng(spot.lng);
  //     setName(spot.name);
  //     setDescription(spot.description);
  //     setPrice(spot.price);
  //   }
  // }, [spot]);

  useEffect(() => {
    dispatch(getAllSpotsThunk()).then(dispatch(getSpotByIdThunk(spotId)));
    // .then(setIsLoaded(true));
  }, [dispatch, spotId]);

  useEffect(() => {
    let errors = [];
    if (address === "")
      errors.push(
        "Street address is required and need to be at least 10 characters"
      );
    if (city === "") errors.push("City is required");
    if (state === "") errors.push("State is required");
    if (country === "") errors.push("Country is required");
    if (lat === "") errors.push("Latitude is not valid");
    if (lng === "") errors.push("Longitude is not valid");
    if (name === "")
      errors.push("Name is required and must be less than 50 characters");
    if (name?.length > 50) errors.push("Name must be less than 50 characters");
    if (description === "") errors.push("Description is required");
    if (price === "") errors.push("Price per day is required");
    if (imageUrl === "") errors.push("Image URL is required");
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

    const payload = { userInput: spotInfo, spotId };
    const data = await dispatch(editASpotThunk(payload));
    //need to redirect to the newly created spot
    history.push(`/spots/${data.id}`);
  };
  return (
    // { isLoaded } &&
    { spot } && (
      <form onSubmit={onSubmit}>
        <h1>Form</h1>
        <ul>
          {validationErrors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
        <label>
          Address
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          City
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State
          <input
            type="text"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          Country
          <input
            type="text"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
          lat
          <input
            type="number"
            name="lat"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
          />
        </label>
        <label>
          lng
          <input
            type="number"
            name="lng"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
          />
        </label>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price
          <input
            type="text"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Image URL
          <input
            type="text"
            name="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={validationErrors.length > 0}>
          Submit
        </button>
      </form>
    )
  );
}
export default EditSpotForm;

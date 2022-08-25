// import { post } from "../../../backend/routes/api/spots";
import { csrfFetch } from "./csrf";

//type
const GET_ALL_SPOTS = "/spots/all-spots";
const GET_SPOTS_OWNED_BY_USER = "/spots/user-spots";
const GET_DETAILS_OF_A_SPOT = "/spots/spotId";
const CREATE_A_SPOT = "spot/create";
// const ADD_IMG_TO_A_SPOT = "/spots/spotId/new-img";
const EDIT_A_SPOT = "/spots/spotId/edit";
const DELETE_A_SPOT = "/spots/spotId/delete";

//action creators
const getAllSpots = (spotsArr /* data.Spots array of obj*/) => {
  return {
    type: GET_ALL_SPOTS,
    spotsArr,
  };
};

const getSpotsOwnedByUser = (payload) => {
  return {
    type: GET_SPOTS_OWNED_BY_USER,
    payload,
  };
};
const getDetailsOfASpot = (payload) => {
  return {
    type: GET_DETAILS_OF_A_SPOT,
    payload,
  };
};
const createASpot = (payload) => {
  return {
    type: CREATE_A_SPOT,
    payload,
  };
};
// const addImgToASpot = (payload) => {
//   return {
//     type: ADD_IMG_TO_A_SPOT,
//     payload,
//   };
// };
const editASpot = (payload) => {
  return {
    type: EDIT_A_SPOT,
    payload,
  };
};
const deleteASpot = (payload) => {
  return {
    type: DELETE_A_SPOT,
    payload,
  };
};

//thunks
export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    console.log("response inside get all spots thunk", response);
    const data = await response.json(); //Spots:[{},{}]
    console.log("data inside get all spots thunk", data);
    dispatch(getAllSpots(data.Spots)); //[{},{},{}]
    return data;
  } else {
    return response;
  }
};

export const getSpotByOwnerThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");
  if (response.ok) {
    console.log("response inside get all spots thunk", response);
    const data = await response.json(); //Spots:[{},{}]
    console.log("data inside get all spots thunk", data);
    dispatch(getSpotsOwnedByUser(data.Spots)); //[{},{},{}]
    return data;
  } else {
    return response;
  }
};

export const spotDetailsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    console.log("response inside get spot details thunk", response);
    const data = await response.json();
    console.log("data inside get spot details thunk", data);
    dispatch(getDetailsOfASpot(data));
    return data;
  } else {
    return response;
  }
};
export const getSpotByIdThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  console.log("response inside get Spot by Id Thunk", response);
  if (response.ok) {
    const data = await response.json();
    console.log("data inside getSpot by id thunk", data);
    dispatch(getDetailsOfASpot(data));
  }
};
export const createASpotThunk = (userInput) => async (dispatch) => {
  console.log("userInput in thunk create a spot", userInput);
  const { address, city, state, country, lat, lng, name, description, price } =
    userInput;
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    }),
  });
  if (response.ok) {
    console.log("response inside create a spot thunk", response);
    const data = await response.json();
    console.log("data inside get all spots thunk", data);
    dispatch(createASpot(data));
    // dispatch(getSpotByIdThunk(data));
    return data;
    //might want to redirect to newly created SPOT
  } else {
    console.log("response is not okay!!!!---------");
    return response; //handle errors HERE?
  }
};
export const editASpotThunk =
  ({ userInput, spotId }) =>
  async (dispatch) => {
    console.log("userInput in thunk edit a spot", userInput);
    console.log("spotId~~~~", spotId);
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = userInput;
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
      }),
    });
    if (response.ok) {
      console.log("response inside create a spot thunk", response);
      const data = await response.json();
      console.log("data inside get all spots thunk", data);
      dispatch(editASpot(data));
      // dispatch(getSpotByIdThunk(data));
      return data;
      //might want to redirect to newly created SPOT
    } else {
      console.log("response is not okay!!!!---------");
      return response; //handle errors HERE?
    }
  };

export const deleteASpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  }); ///
  console.log("response inside delete a Spot Thunk", response);
  if (response.ok) {
    const data = await response.json();
    console.log("data inside delete a spot thunk", data);
    // dispatch(deleteASpot(data));
    dispatch(deleteASpot(data));
    return data;
  }
};
//reducer
// const initialState = { spots: null };
const initialState = {};

const spotsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ALL_SPOTS: {
      //normalize data-turn convert arr to obj to get O(1) search time
      action.spotsArr.forEach((spot) => {
        //spot is an obj
        newState[spot.id] = spot;
      });
      console.log("newState inside get all spots reducer", newState);
      return newState;
    }
    case GET_DETAILS_OF_A_SPOT: {
      newState = { ...state };
      //adding more details into this spot
      // newState[action.payload.id] = Object.assign(newState[action..id],action.spot);
      newState[action.payload.id] = {
        ...newState[action.payload.id],
        ...action.payload,
      };
      //need tp include more info later
      console.log("newState inside get spot details reducer", newState);
      return newState;
    }
    case CREATE_A_SPOT: {
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      console.log("newState inside create a spot  reducer", newState);
      return newState;
    }
    case EDIT_A_SPOT: {
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      console.log("newState inside edit a spot  reducer", newState);
      return newState;
    }
    case GET_SPOTS_OWNED_BY_USER: {
      action.payload.forEach((spot) => {
        newState[spot.id] = spot;
      });
      console.log("newState inside get spot by owner reducer", newState);
      return newState;
    }
    case DELETE_A_SPOT: {
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    default:
      return state;
  }
};

export default spotsReducer;

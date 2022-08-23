import { csrfFetch } from "./csrf";

//type
const GET_ALL_SPOTS = "/spots/all-spots";
// const GET_SPOTS_OWNED_BY_USER = "/spots/user-spots";
const GET_DETAILS_OF_A_SPOT = "/spots/spotId";
// const CREATE_A_SPOT = "spot/create";
// const ADD_IMG_TO_A_SPOT = "/spots/spotId/new-img";
// const EDIT_A_SPOT = "/spots/spotId/edit";
// const DELETE_A_SPOT = "/spots/spotId/delete";

//action creators
const getAllSpots = (spotsArr /* data.Spots array of obj*/) => {
  return {
    type: GET_ALL_SPOTS,
    spotsArr,
  };
};

// const getSpotsOwnedByUser = (payload) => {
//   return {
//     type: GET_SPOTS_OWNED_BY_USER,
//     payload,
//   };
// };
const getDetailsOfASpot = (payload) => {
  return {
    type: GET_DETAILS_OF_A_SPOT,
    payload,
  };
};
// const createASpot = (payload) => {
//   return {
//     type: CREATE_A_SPOT,
//     payload,
//   };
// };
// const addImgToASpot = (payload) => {
//   return {
//     type: ADD_IMG_TO_A_SPOT,
//     payload,
//   };
// };
// const editASpot = (payload) => {
//   return {
//     type: EDIT_A_SPOT,
//     payload,
//   };
// };
// const deleteASpot = (payload) => {
//   return {
//     type: DELETE_A_SPOT,
//     payload,
//   };
// };

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
    // case DELETE_A_SPOT: {
    //   newState = { ...state };
    //   //adding more details into this spot
    //   delete newState[????]
    //   return newState;
    // }
    default:
      return state;
  }
};
export default spotsReducer;

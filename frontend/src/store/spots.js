import { csrfFetch } from "./csrf";

//type
const GET_ALL_SPOTS = "";
const GET_SPOTS_OWNED_BY_USER = "";
const GET_DETAILS_OF_A_SPOT = "";
const CREATE_A_SPOT = "";
const ADD_IMG_TO_A_SPOT = "";
const EDIT_A_SPOT = "";
const DELETE_A_SPOT = "";

//action creators
const getAllSpots = (payload /* data.Spots */) => {
  return {
    type: GET_ALL_SPOTS,
    payload,
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
const addImgToASpot = (payload) => {
  return {
    type: ADD_IMG_TO_A_SPOT,
    payload,
  };
};
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
  if(response.ok){
    console.log("response inside get all spots thunk", response);
  const data = await response.json();
  console.log("data inside get all spots thunk", data);
  dispatch(getAllSpots(data.Spots));
  return data;
  }
//   else{
// //error handling here
//   }
};

//reducer
const initialState = { spots: null };

const spotsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ALL_SPOTS: {
      //normalize data-turn convert arr to obj to get O(1) search time
      action.payload.forEach((spot) => {
        newState[spot.id] = spot;
      });
      console.log("newState inside get all spots reducer", newState);
      return newState;
    }
    default:
      return state;
  }
};
export default spotsReducer;

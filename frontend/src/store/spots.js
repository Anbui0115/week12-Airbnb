import { csrfFetch } from "./csrf";

//type
const GET_ALL_SPOTS = "";

//action creators
const getAllSpotsAction = (payload) => {
  return {
    type: GET_ALL_SPOTS,
    payload,
  };
};

//thunks
export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const data = await response.json();
  dispatch(getAllSpotsAction(data.Spots));
  return data;
};

//reducer
const initialState = { spots: null };

const spotsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    default:
      return state;
  }
};
export default spotsReducer;

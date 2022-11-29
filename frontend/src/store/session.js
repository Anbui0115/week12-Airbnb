import { csrfFetch } from "./csrf";
//types
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
//action creators
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
    // dont' need userId ?
    //is it bc we have session user?
  };
};

//thunk
//login

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  // console.log("this is user``````", user);
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  // console.log("response in login user", response);
  if (response.ok) {
    const data = await response.json();
    // console.log("data", data);
    dispatch(setUser(data));
    return data;
  }
};

//logout
export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeUser());
    return response;
  }
};
//restore user
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  // console.log("response in restoreUser", response);
  const data = await response.json();
  // console.log("data", data);
  dispatch(setUser(data));
  return response;
};
//sign up
export const signup = (user) => async (dispatch) => {
  // console.log("signup user ------", user);
  const { firstName, lastName, username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
    }),
  });
  // console.log("this is response from sign up", response);
  const data = await response.json();
  // console.log("this is data from sign up", data);
  dispatch(setUser(data));
  return response;
};

//reducer
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;

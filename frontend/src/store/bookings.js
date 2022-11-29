import { csrfFetch } from "./csrf";

const GET_ALL_USER_BOOKINGS = "bookings/getAllUserBookigns";
const GET_ALL_BOOKINGS_SPOT = "bookings/getAllBookingsForSpot";
const CREATE_BOOKING = "bookings/createBooking";
const UPDATE_BOOKING = "bookings/updateBooking";
const DELETE_BOOKING = "booking/deleteBooking";
const LOG_OUT_BOOKINGS = "booking/logoutBookings";

export const getAllUserBookingAction = (bookings) => {
  return {
    type: GET_ALL_USER_BOOKINGS,
    bookings,
  };
};
export const getAllBookingsForSpotAction = (bookings) => {
  return {
    type: GET_ALL_BOOKINGS_SPOT,
    bookings,
  };
};
export const createBookingAction = (booking) => {
  return {
    type: CREATE_BOOKING,
    booking,
  };
};
export const updateBookingAction = (booking) => {
  return {
    type: CREATE_BOOKING,
    booking,
  };
};
export const deleteBookingAction = (id) => {
  return {
    type: DELETE_BOOKING,
    id,
  };
};
export const logoutBookingsAction = () => {
  return {
    type: LOG_OUT_BOOKINGS,
  };
};

export const getAllUserBookingsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/bookings/auth", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const bookings = await response.json();
    dispatch(getAllUserBookingAction(bookings));
    return bookings;
  }
  const errors = await response.json();
  return errors;
};
export const getAllBookingsForSpotThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/auth/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const bookings = await response.json();
    dispatch(getAllBookingsForSpotAction(bookings));
    return bookings;
  }
  const errors = await response.json();
  return errors;
};
export const createBookingThunk = (id, booking) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/auth/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking),
  });
  if (response.ok) {
    const createdBooking = await response.json();
    dispatch(createBookingAction(createdBooking));
    return createdBooking;
  }
  return response;
};
export const updateBookingThunk = (id, booking) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/auth/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking),
  });
  if (response.ok) {
    const updatedBooking = await response.json();
    dispatch(updateBookingAction(booking));
    return updatedBooking;
  }
  return response;
};
export const deleteBookingThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/auth/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const message = await response.json();
    dispatch(deleteBookingAction(id));
    return message;
  }
  return response;
};

const bookingsReducer = (state = null, action) => {
  switch (action.type) {
    case GET_ALL_USER_BOOKINGS: {
      const newState = { ...state };
      const bookingsArr = action.bookings.Bookings;
      bookingsArr.forEach((booking) => {
        newState[booking.id] = booking;
      });
      newState.orderedBookingList = [...bookingsArr];
      return newState;
    }
    case GET_ALL_BOOKINGS_SPOT: {
      const newState = {};
      if (action.bookings.Bookings) {
        const bookingsArr = action.bookings.Bookings;
        bookingsArr.forEach((booking) => {
          newState[booking.id] = booking;
        });
        newState.orderedBookingList = [...bookingsArr];
        return newState;
      } else {
        newState.orderedBookingList = [];
        return newState;
      }
    }
    case DELETE_BOOKING: {
      const newState = { ...state };
      delete newState[action.id];
      newState.orderedBookingList = [...state.orderedBookingList];
      return newState;
    }
    case UPDATE_BOOKING:
    case CREATE_BOOKING: {
      const newState = { ...state };
      newState[action.booking.id] = action.booking;
      return newState;
    }
    case LOG_OUT_BOOKINGS: {
      const newState = null;
      return newState;
    }
    default:
      return state;
  }
};

export default bookingsReducer;

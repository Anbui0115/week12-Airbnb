import { csrfFetch } from "./csrf";

const GET_ALL_BOOKINGS_FOR_SPOT_BY_ID = "bookings/getAllBookingsForASpot";
const GET_ALL_BOOKINGS_FOR_CURRENT_USER = "bookings/getAllBookingsForCurrentUser";
const CREATE_BOOKING = "bookings/createBooking";
const UPDATE_BOOKING = "bookings/updateBooking";
const DELETE_BOOKING = "booking/deleteBooking";
const LOG_OUT_BOOKINGS = "bookings/logoutBookings";

export const getAllBookingsForSpotIdAction = (bookings) => {
  return {
    type: GET_ALL_BOOKINGS_FOR_SPOT_BY_ID,
    bookings,
  };
};
export const getAllBookingsForCurrentUserAction = (bookings) => {
  return {
    type: GET_ALL_BOOKINGS_FOR_CURRENT_USER,
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

export const getAllBookingsForSpotIdThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/auth/${spotId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const bookings = await response.json();
    dispatch(getAllBookingsForSpotIdAction(bookings));
    return bookings;
  }
  const errors = await response.json();
  return errors;
};
export const getAllBookingsForCurrentUserThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/bookings/auth", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const bookings = await response.json();
    dispatch(getAllBookingsForCurrentUserAction(bookings));
    return bookings;
  }
  const errors = await response.json();
  return errors;
};
export const createBookingThunk = (spotId, booking) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/auth/${spotId}`, {
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
export const updateBookingThunk = (bookingId, booking) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/auth/${bookingId}`, {
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
export const deleteBookingThunk = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/auth/${bookingId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const message = await response.json();
    dispatch(deleteBookingAction(bookingId));
    return message;
  }
  return response;
};

export const logoutBookingsThunk = () => async (dispatch) => {
  dispatch(logoutBookingsAction());
};


const bookingsReducer = (state = null, action) => {
  switch (action.type) {
    case GET_ALL_BOOKINGS_FOR_SPOT_BY_ID: {
      const newState = {};
      if (action.bookings.Bookings) {
        console.log("action", action);
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
    case GET_ALL_BOOKINGS_FOR_CURRENT_USER: {
      const newState = { ...state };
      // action has type and bookings: {Bookings: Array(5)}
      //so we need to key into action at bookings.Bookings to get the array
      //check api route for booking line 102
      const bookingsArr = action.bookings.Bookings;
      bookingsArr.forEach((booking) => {
        newState[booking.id] = booking;
      });
      newState.orderedBookingList = [...bookingsArr];
      return newState;
    }
    case DELETE_BOOKING: {
      const newState = { ...state };
      delete newState[action.id];
      newState.orderedBookingList = [...state.orderedBookingList];
      return newState;
    }

    case CREATE_BOOKING:
    case UPDATE_BOOKING: {
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

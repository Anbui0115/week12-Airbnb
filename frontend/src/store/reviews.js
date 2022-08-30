import { csrfFetch } from "./csrf";
import { spotDetailsThunk } from "./spots";
//Types:
//get all
const GET_REVIEWS_CURRENT_USER = "reviews/current";
const GET_REVIEWS_OF_SPOT = "reviews/:spotId";
const CREATE_REVIEW = "reviews/create";
const EDIT_REVIEW = "reviews/reviewId/edit";
const DELETE_REVIEW = "reviews/reviewId/delete";

//ActionCreators:
const getReviewsCurrentUser = (reviews) => {
  return {
    type: GET_REVIEWS_CURRENT_USER,
    reviews,
  };
};

const getReviewsOfSpot = (payload) => {
  return {
    type: GET_REVIEWS_OF_SPOT,
    payload,
  };
};

const createReview = (payload) => {
  return {
    type: CREATE_REVIEW,
    payload,
  };
};

const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

//Thunks:
//fetchReviews

export const getReviewsCurrentUserThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/reviews/current");

  if (response.ok) {
    const data = await response.json();
    // console.log("data in get current user reviews thunk", data);
    dispatch(getReviewsCurrentUser(data.Reviews));
    return data;
  }
};

export const getReviewsBySpotId = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const data = await response.json();
    // dispatch(getReviewsOfSpot(data.Reviews));
    dispatch(getReviewsOfSpot(data.Reviews));

    // console.log("data inside get reviews by spot id", data);
    return data;
  } else {
    return response;
  }
};

export const createAReview =
  ({ userInput, spotId }) =>
  async (dispatch) => {
    // console.log("heloooooooo spotId", spotId);
    const response = await csrfFetch(` /api/spots/${spotId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    });

    if (response.ok) {
      const data = await response.json();
      // console.log("data in my create a review thunk", data);
      dispatch(createReview(data));
      return data;
    }
  };

export const deleteAReview = (reviewId, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteReview(reviewId));
    dispatch(spotDetailsThunk(spotId));
  }
  return response;
};

//initialState
const initialState = {};

//reducer
const reviewsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_REVIEWS_CURRENT_USER: {
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    }
    case CREATE_REVIEW: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case GET_REVIEWS_OF_SPOT: {
      action.payload.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
      //  newState[action.payload.id] = {
      //    ...newState[action.payload.id],
      //    ...action.payload,
      //  };
    }
    case EDIT_REVIEW: {
      const newState = { ...state };
      newState[action.spot.id] = action.spot;
      return newState;
    }
    case DELETE_REVIEW: {
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    }
    default:
      return state;
  }
};

export default reviewsReducer;

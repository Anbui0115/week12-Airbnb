import { csrfFetch } from "./csrf";

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

const getReviewsOfSpot = (reviews) => {
  return {
    type: GET_REVIEWS_OF_SPOT,
    reviews,
  };
};

const createReview = (userInput) => {
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
  const response = await csrfFetch("/api/reviews");

  if (response.ok) {
    const data = await response.json();
    dispatch(getReviewsCurrentUser(data));
  }
};

export const getReviewsBySpotId = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getReviewsOfSpot(data.Reviews));
  }
};

export const createAReview = (userInput) => async (dispatch) => {
  const response = await csrfFetch("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(createReview(review));
  }
};

export const deleteAReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${reviewId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteReview(reviewId));
  }
};

//initialState
const initialState = {};

//reducer
const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS_CURRENT_USER: {
      const allReviews = {};
      action.reviews.forEach((review) => {
        allReviews[review.id] = review;
      });
      return allReviews;
    }
    case CREATE_REVIEW: {
      const newState = { ...state };
      newState[action.spot.id] = action.spot;
      return newState;
    }
    case GET_REVIEWS_OF_SPOT: {
      const newState = { ...state };
      newState[action.spotById.id] = action.spotById;
      return newState;
    }
    case EDIT_REVIEW: {
      const newState = { ...state };
      newState[action.spot.id] = action.spot;
      return newState;
    }
    case DELETE_REVIEW: {
      const newState = { ...state };
      delete newState[action.spotId];
      return newState;
    }
    default:
      return state;
  }
};

export default reviewsReducer;

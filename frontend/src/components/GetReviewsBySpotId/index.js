import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getReviewsBySpotId } from "../../store/reviews";
import { deleteAReview } from "../../store/reviews";
import { spotDetailsThunk } from "../../store/spots";
import ReviewCard from "../ReviewCard";

import "./GetReviewSpotId.css";

function GetReviewsBySpotId() {
  console.log("GET REVIEW BY SPOT ID ------");
  const dispatch = useDispatch();
  const history = useHistory();
  let { spotId } = useParams();
  // console.log("spotId------", spotId, typeof spotId); //1--string
  spotId = Number(spotId);
  // console.log("spotsId!!!!!!!", spotId);
  const spotsObj = useSelector((state) => state.spots);
  // console.log("spotsArray", spotsObj);
  //   const spot = useSelector((state) => state.spots.id);
  const spot = spotsObj[spotId];

  const reviews = useSelector((state) => Object.values(state.reviews));
  console.log("this is reviews in get reviews by spot id", reviews);
  const sessionUser = useSelector((state) => state.session.user);

  let leftAReview = false;
  if (sessionUser && reviews) {
    reviews.map((review) => {
      if (sessionUser.id === review.userId) {
        leftAReview = true;
      }
    });
  }

  const deleteYourReview = (e, reviewId) => {
    e.preventDefault();
    dispatch(deleteAReview(reviewId, spotId));
    dispatch(spotDetailsThunk(spotId));
  };
  const createAReview = (e) => {
    e.preventDefault();
    history.push(`/spots/${spot.id}/create-review`);
  };
  if (!reviews) return null;

  return (
    <div className="reviews-outer-container">
      {/* <div>Hello this is review by spot id</div> */}
      <div className="spot-detail-sub-bar">
        {spot.avgStarRating === "0.0" ? null : ( // <span className="spot-rating">No Reviews</span>
          <span className="spot-rating">&#9733; {spot.avgStarRating} . </span>
        )}
        <span className="spot-numReviews ">{spot.numReviews} Reviews </span>
      </div>
      <div className="all-reviews-container">
        <div className="reviews-display">
          <div className="all-reviews-outer-container">
            {reviews.map((review) => (
              <ReviewCard review={review} />
            ))}
          </div>
        </div>

        {!leftAReview && sessionUser && (
          <button
            className="leave-a-review"
            // hidden={sessionUser.id === review.userId}
            // hidden={leaveAReview}
            onClick={createAReview}
          >
            Leave a review
          </button>
        )}
      </div>
    </div>
  );
}

export default GetReviewsBySpotId;

import {
  logoutReviewsThunk,
  getReviewsCurrentUserThunk,
} from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";

import { deleteAReview } from "../../store/reviews";
import { spotDetailsThunk } from "../../store/spots";

import "./GetReviewCurrentUser.css";

function GetReviewsCurrentUser() {
  const dispatch = useDispatch();
  let { spotId } = useParams();
  spotId = Number(spotId);
  const reviews = useSelector((state) => Object.values(state.reviews));
  const sessionUser = useSelector((state) => state.session.user);
  const sessionUserReviews = reviews.filter(
    (review) => review?.userId === sessionUser?.id
  );

  useEffect(() => {
    dispatch(getReviewsCurrentUserThunk());
    return () => {
      // console.log("cleaning up review");
      // console.log("reviews-------", reviews);
      dispatch(logoutReviewsThunk());
    };
  }, [dispatch]);

  const deleteYourReview = (e, reviewId) => {
    e.preventDefault();
    dispatch(deleteAReview(reviewId, spotId));
    dispatch(spotDetailsThunk(spotId));
  };

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className="sessionUser-most-outer">
      <div className="sessionUser-reviews-outer-container">
        <h1 className="your-reviews">Your Reviews</h1>
        <div className="sessionUser-reviews-inner-container">
          <div className="sessionUser-review-card">
            <div>
              {sessionUserReviews.map((review) => (
                <div className="sessionUser-each-review ">
                  <div className="sessionUser-review-info">
                    <div className="sessionUser-review-details">
                      {review.review}
                    </div>
                    <div> &#9733; {review.stars}</div>
                  </div>
                  <div className="delete-your-review">
                    <button
                      className="delete-user-review-button"
                      onClick={(e) => deleteYourReview(e, review.id)}
                    >
                      Delete Your Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default GetReviewsCurrentUser;

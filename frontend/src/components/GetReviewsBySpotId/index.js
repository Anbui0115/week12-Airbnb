import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getReviewsBySpotId } from "../../store/reviews";
import { deleteAReview } from "../../store/reviews";
import { spotDetailsThunk } from "../../store/spots";
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
    <>
      <div>Hello this is review by spot id</div>
      {reviews.map((review) => (
        <div key={`review${review.id}`}>
          <li>review Id:{review.id}</li>
          <li>review:{review.review}</li>
          <li>review stars:{review.stars}</li>
          <li>review Owner id:{review.userId}</li>
          {sessionUser && (
            <button
              hidden={sessionUser.id !== review.userId}
              onClick={(e) => deleteYourReview(e, review.id)}
            >
              Delete your review
            </button>
          )}
        </div>
      ))}
      {!leftAReview && sessionUser && (
        <button
          // hidden={sessionUser.id === review.userId}
          // hidden={leaveAReview}
          onClick={createAReview}
        >
          Leave a review
        </button>
      )}
    </>
  );
}

export default GetReviewsBySpotId;

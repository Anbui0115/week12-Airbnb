import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getReviewsBySpotId } from "../../store/reviews";
import { deleteAReview } from "../../store/reviews";
import { spotDetailsThunk } from "../../store/spots";
function GetReviewsBySpotId() {
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
  // console.log("this is reviews in get reviews by spot id", reviews);
  const sessionUser = useSelector((state) => state.session.user);

  // useEffect(() => {
  //   dispatch(getReviewsBySpotId(spotId));
  // }, [dispatch, spotId]);

  const deleteYourReview = (reviewId) => {
    // e.preventDefault()
    dispatch(deleteAReview(reviewId, spotId));
    dispatch(spotDetailsThunk(spotId));
  };
  // const deleteThisSpot = (spotId) => {
  //   // e.preventDefault()
  //   dispatch(spotId);
  //   dispatch(spotDetailsThunk(spotId));
  // };
  const createAReview = (e) => {
    e.preventDefault();
    history.push(`/spots/${spot.id}/create-review`);
  };
  if (!reviews || !sessionUser) return null;
  return (
    <>
      <div>Hello this is review by spot id</div>
      {/* {reviews.length === 0 && (
        {reviews.map(review =>(
          <>
          <div>This is a new spot, please leave a review</div>
          <button
            hidden={sessionUser.id === review.userId}
            onClick={createAReview}
          >
            Leave a review
          </button>
        </>
        ))}

      )} */}
      {reviews.map((review) => (

        <div key={`review${review.id}`}>
          {/* {console.log("review", review)} */}
          {/* {console.log("sessionUser", sessionUser, review.userId)} */}
          <li>review Id:{review.id}</li>
          <li>review:{review.review}</li>
          <li>review stars:{review.stars}</li>
          <li>review Owner id:{review.userId}</li>
          <button
            hidden={sessionUser.id !== review.userId}
            onClick={() => deleteYourReview(review.id)}
          >
            Delete your review
          </button>
          <button
            hidden={sessionUser.id === review.userId}
            onClick={createAReview}
          >
            Leave a review
          </button>
        </div>
      ))}
    </>
  );
}

export default GetReviewsBySpotId;

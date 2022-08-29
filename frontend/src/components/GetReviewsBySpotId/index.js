import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewsBySpotId } from "../../store/reviews";
import { deleteAReview } from "../../store/reviews";
import { spotDetailsThunk } from "../../store/spots";
function GetReviewsBySpotId() {
  const dispatch = useDispatch();
  let { spotId } = useParams();
  console.log("spotId```````", spotId, typeof spotId);
  spotId = Number(spotId);

  const reviews = useSelector((state) => Object.values(state.reviews));
  console.log("this is reviews in get reviews by spot id", reviews);
  const sessionUser = useSelector((state) => state.session.user);

  // useEffect(() => {
  //   dispatch(getReviewsBySpotId(spotId));
  // }, [dispatch, spotId]);

  const deleteYourReview = (reviewId) => {
    // e.preventDefault()
    dispatch(deleteAReview(reviewId, spotId));
    dispatch(spotDetailsThunk(spotId));
  };

  if (!reviews || !sessionUser) return null;
  return (
    <>
      <div>Hello this is review by spot id</div>
      {reviews.map((review) => (
        <div key={`review${review.id}`}>
          {/* {console.log("review", review)}
          {console.log("sessionUser", sessionUser, review.userId)} */}
          <li>{review.id}</li>
          <li>{review.review}</li>
          <li>{review.stars}</li>
          <li>{sessionUser.id}</li>
          <button
            // style={{
            //   visibility: `${
            //     sessionUser.id === review.userId ? "visible" : "hidden"
            //   }`,
            // }}

            hidden={sessionUser.id !== review.userId}
            onClick={() => deleteYourReview(review.id)}
          >
            Delete your review
          </button>
        </div>
      ))}
    </>
  );
}

export default GetReviewsBySpotId;

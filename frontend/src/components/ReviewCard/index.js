import { useDispatch, useSelector } from "react-redux";
import { spotDetailsThunk } from "../../store/spots";
import { useParams } from "react-router-dom";
import { deleteAReview } from "../../store/reviews";
const ReviewCard = ({ review }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  let { spotId } = useParams();
  spotId = Number(spotId);
  const deleteYourReview = (e, reviewId) => {
    e.preventDefault();
    dispatch(deleteAReview(reviewId, spotId));
    dispatch(spotDetailsThunk(spotId));
  };
  let reviewDate;
  const options = {
    year: "numeric",
    month: "long",
  };
  if (review.createdAt) {
    reviewDate = new Date(review.createdAt).toLocaleDateString(
      undefined,
      options
    );
  }
  console.log("REVIEW DATE", reviewDate);
  return (
    <div>
      <div className="each-review-container">
        {/* <div>review Id:{review.id}</div> */}
        <div>{review.userId}</div>
        <div>review stars:{review.stars}</div>
        <div>review:{review.review}</div>

        {sessionUser && (
          <button
            hidden={sessionUser.id !== review.User.firstName}
            onClick={(e) => deleteYourReview(e, review.id)}
          >
            Delete your review
          </button>
        )}
      </div>
    </div>
  );
};
export default ReviewCard;

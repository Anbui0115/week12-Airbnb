import { useDispatch, useSelector } from "react-redux";
import { spotDetailsThunk } from "../../store/spots";
import {  useParams } from "react-router-dom";
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
  return (
    <>
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
    </>
  );
};
export default ReviewCard;

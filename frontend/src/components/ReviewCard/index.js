import { useDispatch, useSelector } from "react-redux";
import { spotDetailsThunk } from "../../store/spots";
import { useParams } from "react-router-dom";
import { deleteAReview } from "../../store/reviews";
import reviewAvatar from "./review-avatar.jpeg";
import "./ReviewCard.css";
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
  // console.log("REVIEW DATE", reviewDate);
  return (
    <div>
      <div className="each-review-container">
        {/* <div>review Id:{review.id}</div> */}

        <div className="review-card-bar">
          <div className="review-avatar-container">
            <img src={reviewAvatar} />
          </div>
          <div>
            <div className="review-firstName">{review.User.firstName}</div>
            <div className="review-date">{reviewDate}</div>
          </div>
        </div>

        <div className="spotDetails-review-star">&#9733; {review.stars}</div>
        <div className="spotDetails-review-info">{review.review}</div>
      </div>
    </div>
  );
};
export default ReviewCard;

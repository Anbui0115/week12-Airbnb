import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createAReview, getReviewsBySpotId } from "../../store/reviews";

function CreateReviewForm() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [stars, setStars] = useState("");
  const [review, setReview] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [errors, setErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let errors = [];
    if (stars < 1 || stars > 5) errors.push("Stars must be between 1 and 5");
    // if (review.length < 1) errors.push("Review is required");
    if (review.length < 4)
      errors.push("Review needs to be longer than 4 characters");
    if (review.length >= 150)
      errors.push("Review needs to be less than 150 characters");

    setErrors(errors);
  }, [stars, review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    setErrors([]);
    // if (validationErrors.length > 0) {
    //   return alert("Cannot Submit");
    // }

    const userInput = {
      spotId: Number(spotId),
      userId: Number(sessionUser.id),
      stars: Number(stars),
      review,
    };

    const payload = { userInput, spotId };
    // let createReview = await dispatch(createAReview(payload)).catch(
    const createReview = await dispatch(createAReview(payload)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
    // Added the dispatch below so that the state is updated with all the information needed for the new review
    const reviews = await dispatch(getReviewsBySpotId(spotId));
    if (createReview) {
      history.push(`/spots/${spotId}`);
    }
  };
  return (
    // { hasSubmitted } && (
    <form onSubmit={handleSubmit}>
      <h2 className="create-review-title">How was your experience?</h2>
      <div className="create-review-inner-container">
        <ul className="create-review-error">
          {hasSubmitted &&
            errors.map((error, idx) => <li key={error}>{error}</li>)}
        </ul>
        <div className="create-review-details-container">
          <div className="create-review-text">Review</div>
          <textarea
            className="create-review-details-input"
            id="review"
            onChange={(e) => setReview(e.target.value)}
            value={review}
            placeholder="Write your review"
            required
          ></textarea>
        </div>
        <div className="create-review-star">
          How would you rate this experience?
        </div>
        <div className="create-review-rating-container">
          <input
            className="create-review-rating-input"
            type="number"
            min="1"
            max="5"
            placeholder="Stars"
            required
            value={stars}
            onChange={(e) => setStars(e.target.value)}
          />
        </div>
        {/* <button disabled={validationErrors.length > 0}>Submit</button> */}

        <div className="create-review-submit-container">
          <button
            className="create-review-submit"
            disabled={hasSubmitted && errors.length > 0}
          >
            Create review
          </button>
        </div>
      </div>
    </form>
    // )
  );
}
export default CreateReviewForm;

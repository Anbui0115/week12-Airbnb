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

  const [validationErrors, setValidationErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const errors = [];
    if (stars < 1 || stars > 5) errors.push("Stars must be between 1 and 5");
    if (!review) errors.push("Review is required");

    return setValidationErrors(errors);
  }, [stars, review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (validationErrors.length > 0) {
      return alert("Cannot Submit");
    }

    const userInput = {
      spotId: Number(spotId),
      userId: Number(sessionUser.id),
      stars: Number(stars),
      review,
    };
    // console.log("STARS____________", stars, typeof stars);
    const payload = { userInput, spotId };
    let createReview = await dispatch(createAReview(payload));
    // Added the dispatch below so that the state is updated with all the information needed for the new review
    const data = await dispatch(getReviewsBySpotId(spotId));
    if (createReview) {
      history.push(`/spots/${spotId}`);
    }
  };
  return (
    { hasSubmitted } && (
      <form onSubmit={handleSubmit}>
        <h2>Write a Review</h2>
        <div>
          <ul>
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>

        <input
          type="number"
          min="1"
          max="5"
          placeholder="Stars"
          required
          value={stars}
          onChange={(e) => setStars(e.target.value)}
        />
        <textarea
          id="review"
          onChange={(e) => setReview(e.target.value)}
          value={review}
          placeholder="Write your review here"
        ></textarea>
        <button disabled={validationErrors.length > 0}>Submit</button>
      </form>
    )
  );
}
export default CreateReviewForm;

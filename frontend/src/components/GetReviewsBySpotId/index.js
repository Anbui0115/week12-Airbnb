import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewsBySpotId } from "../../store/reviews";
function GetReviewsBySpotId() {
  const dispatch = useDispatch();
  let { spotId } = useParams();
  console.log("spotId```````", spotId, typeof spotId);
  spotId = Number(spotId);

  const reviews = useSelector((state) => Object.values(state.reviews));
  console.log("this is reviews in get reviews by spot id", reviews);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getReviewsBySpotId(spotId));
  }, [dispatch, spotId]);
  if (!reviews || !sessionUser) return null;
  return (
    <>
      <div>Hello this is review by spot id</div>
      {reviews.map((review) => (
          <div key={`review${review.id}`}>
            <li>{review.id}</li>
            <li>{review.review}</li>
            <li>{review.stars}</li>
          </div>
        ))}
    </>
  );
}
export default GetReviewsBySpotId;

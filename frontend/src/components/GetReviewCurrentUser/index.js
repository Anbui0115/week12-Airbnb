import { getReviewsCurrentUserThunk } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function GetReviewsCurrentUser() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviews));

  // console.log("this is reviews", reviews);
  useEffect(() => {
    dispatch(getReviewsCurrentUserThunk());
  }, [dispatch]);
  return (
    <>
      <div>All reviews of current user</div>
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
export default GetReviewsCurrentUser;

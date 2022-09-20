import {
  cleanUpReviewsState,
  getReviewsCurrentUserThunk,
} from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";

function GetReviewsCurrentUser() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviews));
  const sessionUser = useSelector((state) => state.session.user);
  // console.log("this is reviews", reviews);
  useEffect(() => {
    dispatch(getReviewsCurrentUserThunk());
    return () => {
      console.log("cleaning up review");
      console.log("reviews-------", reviews);
      dispatch(cleanUpReviewsState());
    };
  }, [dispatch]);
  if (!sessionUser) return <Redirect to="/" />;
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

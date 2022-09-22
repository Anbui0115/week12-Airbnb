import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanUpAllSpots, editASpotThunk } from "../../store/spots";
import { deleteASpotThunk, spotDetailsThunk } from "../../store/spots";
import { NavLink } from "react-router-dom";
import GetReviewsBySpotId from "../GetReviewsBySpotId";
import { cleanUpReviewsState, getReviewsBySpotId } from "../../store/reviews";
// import EditSpotForm from "../EditASpot";
import "./SpotDetail.css";

function GetSpotDetails() {
  const history = useHistory();
  const dispatch = useDispatch();

  let { spotId } = useParams();
  spotId = Number(spotId);

  const spotsObj = useSelector((state) => state.spots);
  const spot = spotsObj[spotId];
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(spotDetailsThunk(spotId));
    dispatch(getReviewsBySpotId(spotId));
    return () => {
      // console.log("clean up review running");
      dispatch(cleanUpReviewsState());
      dispatch(cleanUpAllSpots());
    };
  }, [dispatch, spotId]);

  if (!spot) {
    return <h1>Loading ...</h1>;
  }

  let images;
  //need to conditionally render
  if (spot.Images) {
    images = spot.Images.map((image) => (
      <div className="spot-img">
        <img src={image.url} />
      </div>
    ));
  }

  const onClickDelete = (e, spotId) => {
    e.preventDefault();
    dispatch(deleteASpotThunk(spotId));
    history.push(`/`);
  };
  // const createAReview = (e) => {
  //   e.preventDefault();
  //   history.push(`/spots/${spot.id}/create-review`);
  // };
  const editYourSpot = (e) => {
    e.preventDefault();
    history.push(`/spots/${spotId}/edit`);
  };
  // const deleteThisSpot = (spotId) => {
  //   // e.preventDefault()
  //   dispatch(spotId);
  //   dispatch(spotDetailsThunk(spotId));
  // };
  return (
    { images } && { spot } && (
      <div className="spot-details-outer-container">
        <div className="spot-details-inner-container">
          <div className="spot-name-container">
            <div className="spot-name-text">{spot.name}</div>
          </div>
          {/* <span>&#9733; {spot.avgStarRating} </span> */}

          <div className="spot-detail-sub-bar ">
            {spot.avgStarRating === "0.0" ? null : ( // <span className="spot-rating">No Reviews</span>
              <span className="spot-rating">
                &#9733; {spot.avgStarRating} .{" "}
              </span>
            )}

            <span className="spot-numReviews ">{spot.numReviews} Reviews </span>

            <span className="spot-sub-bar-info ">
              . {spot.city}, {spot.state}, {spot.country}
            </span>
          </div>

          <br />
          <div className="spot-image-container ">
            <div className="spot-img">{images}</div>
          </div>

          <div className="spot-description-container">
            <p className="spot-description-text">{spot.description}</p>
          </div>
          <div className="spot-price-container">
            <p className="spot-price-text">${spot.price}</p>
            <span>per night</span>
          </div>
          {/* <div className="hosted-by-container ">
          <p className="hosted-by-text">
            Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
          </p>
        </div> */}

          <GetReviewsBySpotId />

          {/* <button
          hidden={sessionUser?.id !== spot.ownerId}
          onClick={(e) => onClickDelete(e, spot.id)}
        >
          Delete your spot
        </button>
        <button
          hidden={sessionUser?.id !== spot.ownerId}
          onClick={editYourSpot}
        >
          Edit your spot
        </button> */}
        </div>
      </div>
    )
  );
}
export default GetSpotDetails;

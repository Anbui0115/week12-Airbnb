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
  // console.log("spotId------", spotId, typeof spotId); //1--string
  spotId = Number(spotId);
  // console.log("spotsId!!!!!!!", spotId);
  const spotsObj = useSelector((state) => state.spots);
  // console.log("spotsArray", spotsObj);
  //   const spot = useSelector((state) => state.spots.id);
  const spot = spotsObj[spotId];
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(spotDetailsThunk(spotId));
    dispatch(getReviewsBySpotId(spotId));
    return () => {
      console.log("clean up review running");
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
      <div>
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
      <>
        <h2>{spot.name}</h2>
        {/* <span>&#9733; {spot.avgStarRating} </span> */}
        {spot.avgStarRating ===
        "0.0" ? // <span className="spot-rating">No Reviews</span>
        null : (
          <span className="spot-rating">&#9733; {spot.avgStarRating}</span>
        )}
        {/* <NavLink to={`/spots/${spot.id}/reviews`}> */}

        <span>{spot.numReviews} Reviews</span>

        {/* </NavLink> */}
        <span>
          {spot.city}, {spot.state}, {spot.country}
        </span>
        <br />
        <div>{images}</div>
        <p>{spot.description}</p>
        <p>${spot.price} per night</p>
        <p>spot.ownerId {spot.ownerId}</p>
        <GetReviewsBySpotId />
        {/* <div>{ownerFunctionality}</div> */}
        {/* <button onClick={createAReview}>Leave a review</button> */}
        {/* <button
          hidden={sessionUser.id !== spot.ownerId}
          onClick={createAReview}
        >
          Delete your review
        </button> */}

        <button
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
        </button>
      </>
    )
  );
}
export default GetSpotDetails;

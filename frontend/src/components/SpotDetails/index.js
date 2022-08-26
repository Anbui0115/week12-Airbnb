import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getAllSpotsThunk } from "../../store/spots";
import { deleteASpotThunk, spotDetailsThunk } from "../../store/spots";
import { NavLink } from "react-router-dom";
import GetReviewsBySpotId from "../GetReviewsBySpotId";
// import EditSpotForm from "../EditASpot";
function GetSpotDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  let { spotId } = useParams();
  console.log("spotId------", spotId, typeof spotId); //1--string
  spotId = Number(spotId);
  console.log("spotsId!!!!!!!", spotId);
  const spotsObj = useSelector((state) => state.spots);
  console.log("spotsArray", spotsObj);
  //   const spot = useSelector((state) => state.spots.id);
  const spot = spotsObj[spotId];
  const sessionUser = useSelector((state) => state.session.user);
  console.log("spot~~~~~", spot);

  //    const displaySpots = spotsArray.map((spot) => (
  //      <div key={spot.id}>{spot.name}</div>
  //    ));

  useEffect(() => {
    dispatch(spotDetailsThunk(spotId));
  }, [dispatch, spotId]);

  if (!spot) {
    return <h1>no SPOTS</h1>;
  }
  const onClickEdit = (e) => {
    e.preventDefault();
    history.push(`/spots/${spotId}/edit`);
  };
  const onClickDelete = (e) => {
    e.preventDefault();
    dispatch(deleteASpotThunk(spotId));
    history.push(`/spots`);
  };

  const images = spot.Images.map((image) => (
    <div>
      <img src={image.url} width="250" height="250" />
    </div>
  ));

  let ownerFunctionality;
  if (sessionUser === spot.owner) {
    ownerFunctionality = (
      <>
        <button onClick={onClickEdit}>Edit</button>
        <button onClick={onClickDelete}>Delete</button>
      </>
    );
  } else {
    console.log("session user error: " + sessionUser);
  };

  return (
    <>
      <h2>{spot.name}</h2>
      <span>&#9733; {spot.avgStarRating} </span>
      <NavLink to={`/spots/${spot.id}/reviews`}>
        <span>{spot.numReviews} Reviews</span>
      </NavLink>
      <span> {spot.address}</span>
      <br />
      <div>{images}</div>
      <p>{spot.description}</p>
      <p>${spot.price} per night</p>
      <div>{ownerFunctionality}</div>
      <GetReviewsBySpotId />
    </>
  );
}
export default GetSpotDetails;

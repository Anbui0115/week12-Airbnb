import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getAllSpotsThunk } from "../../store/spots";
import { deleteASpotThunk, spotDetailsThunk } from "../../store/spots";
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
  return (
    <>
      <h2>Spot Details:</h2>
      <p>{spot.name}</p>
      <p>{spot.address}</p>
      <p>{spot.description}</p>
      <p>{spot.price}</p>

      <button onClick={onClickEdit}>Edit</button>
      <button onClick={onClickDelete}>Delete</button>
    </>
  );
}
export default GetSpotDetails;

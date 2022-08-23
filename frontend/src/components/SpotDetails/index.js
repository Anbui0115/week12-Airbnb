import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getAllSpotsThunk } from "../../store/spots";
import { spotDetailsThunk } from "../../store/spots";

function GetSpotDetails() {
  const dispatch = useDispatch();
  const { spotIdString } = useParams();
  console.log("spotId------", spotIdString, typeof spotIdString); //1--string
  const spotId = Number(spotIdString);
  const spotsArray = useSelector((state) => state.spots);
  console.log("spotsArray", spotsArray);
  //   const spot = useSelector((state) => state.spots.id);
  const spot = spotsArray[spotId];
  console.log("spot~~~~~", spot);


//    const displaySpots = spotsArray.map((spot) => (
//      <div key={spot.id}>{spot.name}</div>
//    ));

  useEffect(() => {
    dispatch(spotDetailsThunk(spotId));
  }, [dispatch, spotId]);

   if (!spot) {
     return null;
   }

   return (
     <>
       <h2>Spot Details:</h2>
       <p>{spot.name}</p>
       <p>{spot.address}</p>
       <p>{spot.description}</p>
       <p>{spot.price}</p>
     </>
   );
}
export default GetSpotDetails;

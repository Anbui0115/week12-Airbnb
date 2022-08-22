import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";

function GetSpotDetails() {
//   const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.spotId);
//   useEffect(()=>{
//     dispatch()
//   })
  return (
    <>
      <div>Spot Details</div>
      <ul>
        <li></li>
      </ul>
    </>
  );
}
export default GetSpotDetails;

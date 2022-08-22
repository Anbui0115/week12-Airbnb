// import * as sessionActions from "../../store/session";
// import { Redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";

function GetAllSpots() {
  const dispatch = useDispatch();
  const allSpots = useSelector((state) => state.spots);
  const allSpotsArray = Object.values(allSpots);
  console.log("this is allSpots inside GetAllSpots component", allSpots);
  console.log("allSpotArray------------", allSpotsArray);
  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);
  return (
    allSpotsArray && (
      <>
        <div>GET ALL SPOTS</div>
        <div>
          <ul>
            {allSpotsArray.map((spot) => (
              <li key={spot.id}>{spot.name}</li>
            ))}
          </ul>
        </div>
      </>
    )
  );
}
export default GetAllSpots;

// import * as sessionActions from "../../store/session";
// import { Redirect } from "react-router-dom";
// import { getRounds } from "bcryptjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import "./getAllSpots.css";
import EachSpot from "../EachSpot";
function GetAllSpots() {
  // const [isLoaded, setIsLoaded] = useState(false); //conditional rendering
  //is Loaded set to false to prevent keying into something doesn't exist
  const dispatch = useDispatch();
  const allSpotsObj = useSelector((state) => state.spots); //{null}---{}
  const allSpotsArray = Object.values(allSpotsObj); //[null]---[]
  // console.log("this is allSpots inside GetAllSpots component", allSpotsObj);
  // console.log("allSpotArray------------", allSpotsArray);

  useEffect(() => {
    //handle errors
    // ex:.catch(async (res) => {
    //         const data = await res.json();
    //         if (data && data.errors) setErrors(data.errors);
    //       }
    // console.log("useEffect isrunning !!!");
    dispatch(getAllSpotsThunk());
    // .then(setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="outer-body">
        {allSpotsArray && (
          <>
            <div></div>
            <div>
              <div className="spots-body">
                {allSpotsArray.map((spot) => (
                  <EachSpot key={spot?.id} spot={spot} />
                  // <NavLink to={`/spots/${spot.id}`} key={`spot${spot.id}`}>
                  //   <div>
                  //     <div>
                  //       <img
                  //         src={
                  //           spot.previewImage ||
                  //           "https://a0.muscache.com/im/pictures/miso/Hosting-580351555068335274/original/94994b90-eab4-4e51-950f-07909eb24dce.jpeg?im_w=960"
                  //         }
                  //         width="250"
                  //         height="250"
                  //         alt-={"home"}
                  //       />
                  //     </div>

                  //     <div>
                  //       <div>{spot.name}</div>
                  //       <div> {spot.description}</div>
                  //       <div>&#9733; {spot.avgRating}</div>
                  //       <div> {spot.price} night</div>
                  //     </div>
                  //   </div>
                  // </NavLink>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default GetAllSpots;

/*-----NEED to useState to prevent RACE ISSUE:try to key into sth that doesn't exist-------------
~~~~~~The ISSUE: when we restart the server or refresh the page, our state got refreshed-null
++++++++++THE SOLUTION: useState to keep track of isLoaded then change isLoaded in the useEffect
the first time VScode reads this file, it reads function GetAllSPots top down
- allSpots and allSpotsArray is empty/ null the first time (if we refresh page/restart server)
then the useEffect is read but not run ( it saves the useEffect to run later)
then it hits the return which is a condtional rendering
at this point isLoaded is falsey which means the condition is not met- the rest of return will not run

Then useEffect run, dispatch getAllSpotsThunk will change the state , allSPots and allSpotsArray now have data in it
then the setIsloaded is called, isLoaded is not set to true
then the return requestIdleCallback,s isLoaded is true, then we can map through an array to key into each spot
*/

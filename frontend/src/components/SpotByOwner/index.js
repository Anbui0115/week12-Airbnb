import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotByOwnerThunk } from "../../store/spots";
import { NavLink} from "react-router-dom";
function SpotsByOwner() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  const spotsArray = Object.values(spots);
  // const history = useHistory();
  // console.log("spots for this user", spots);

  useEffect(() => {
    dispatch(getSpotByOwnerThunk());
  }, [dispatch]);
  // const deleteThisSpot = (e) => {
  //   e.preventDefault();
  //   history.push("/");
  // };
  return (
    { spotsArray } && (
      <>
        <h1>Spots Owned by Current User</h1>
        <ul>
          {spotsArray.map((spot) => (
            <NavLink to={`/spots/${spot.id}`} key={`spot${spot.id}`}>
              <li>{spot.name}</li>
            </NavLink>
          ))}
        </ul>
      </>
    )
  );
}
export default SpotsByOwner;

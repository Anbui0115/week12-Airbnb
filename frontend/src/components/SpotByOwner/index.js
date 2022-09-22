import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotByOwnerThunk } from "../../store/spots";
import { NavLink, Redirect } from "react-router-dom";
import "./SpotByOwner.css";

function SpotsByOwner() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  const spotsArray = Object.values(spots);
  const sessionUser = useSelector((state) => state.session.user);

  const spotsByOwner = spotsArray.filter(
    (spot) => spot?.ownerId === sessionUser.id
  );

  useEffect(() => {
    dispatch(getSpotByOwnerThunk());
  }, [dispatch]);

  if (!spots) return null;
  if (!sessionUser) return <Redirect to="/" />;

  return (
    { spotsArray } && (
      <>
        {/* <h1>Spots Owned by Current User</h1>
        <ul>
          {spotsArray.map((spot) => (
            <NavLink to={`/spots/${spot.id}`} key={`spot${spot.id}`}>
              <li>{spot.name}</li>
            </NavLink>
          ))}
        </ul> */}
        <div className="owner-spots-outer-container">
          <div className="onwer-listing">Your listing </div>
          <div className="owner-spots-inner-container">
            <div className="owner-spot-display">
              {spotsByOwner.map((spot) => (
                <div className="owner-each-spot">
                  <div className="owner-spot-img">
                    <img src={spot.previewImage} alt="owner-spot" />
                  </div>

                  <div>
                    <div className="owner-spot-info">
                      <div className="owner-spot-name">{spot.name}</div>
                      <div className="onwer-spot-city-state">
                        {spot.city}, {spot.state}
                      </div>
                      <div className="owner-spot-price">
                        ${spot.price} night
                      </div>
                    </div>
                  </div>

                  <div>
                    <button className="one-button">
                      <NavLink to={`/spots/${spot.id}/edit`}>Edit Spot</NavLink>
                    </button>
                    <button
                      onClick={() => {
                        dispatch(deleteSpotThunk(spot.id));
                      }}
                    >
                      Delete Spot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  );
}
export default SpotsByOwner;

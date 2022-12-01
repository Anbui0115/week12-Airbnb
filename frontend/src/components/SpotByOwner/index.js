import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";

import { cleanUpAllSpots, getSpotByOwnerThunk } from "../../store/spots";
import { deleteASpotThunk } from "../../store/spots";

import "./SpotByOwner.css";

function SpotsByOwner() {
  const dispatch = useDispatch();
  const history = useHistory();
  let { spotId } = useParams();
  spotId = Number(spotId);
  const spots = useSelector((state) => state.spots);
  const spotsArray = Object.values(spots);
  const sessionUser = useSelector((state) => state.session.user);

  const spotsByOwner = spotsArray.filter(
    (spot) => spot?.ownerId === sessionUser?.id
  );

  useEffect(() => {
    dispatch(getSpotByOwnerThunk());
    return () => {
      dispatch(cleanUpAllSpots());
    };
  }, [dispatch]);

  const onClickDelete = async (e, spotId) => {
    e.preventDefault();
    await dispatch(deleteASpotThunk(spotId));
    history.push(`/`);
  };

  if (!spots) return null;
  if (!sessionUser) return <Redirect to="/" />;

  return (
    { spotsArray } && (
      <>
        <div className="owner-spots-outer-container">
          <div className="onwer-listing">Your listings </div>
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
                    <button className="onwer-edit-button">
                      <NavLink
                        to={`/spots/${spot.id}/edit`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Edit Spot
                      </NavLink>
                    </button>

                    <button
                      className="onwer-delete-button"
                      onClick={(e) => onClickDelete(e, spot.id)}
                    >
                      Delete your spot
                    </button>
                  </div>
                </div>
              ))}
              {spotsByOwner.length < 1 && (
                <div>You currently don't have any listings</div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
}
export default SpotsByOwner;

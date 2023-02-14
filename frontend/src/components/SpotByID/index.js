import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanUpAllSpots } from "../../store/spots";
import { deleteASpotThunk, spotDetailsThunk } from "../../store/spots";
import GetReviewsBySpotId from "../GetReviewsBySpotId";
import {  getReviewsBySpotId } from "../../store/reviews";
import CreateBookingForm from "../Bookings/CreateBooking";
import "./SpotById.css";

function SpotById() {
  const history = useHistory();
  const dispatch = useDispatch();

  let { spotId } = useParams();
  spotId = Number(spotId);

  const spotsObj = useSelector((state) => state.spots);
  const spot = spotsObj?.[spotId];
  const bookings = useSelector((state) => state.bookings?.orderedBookingList);

  useEffect(() => {
    dispatch(spotDetailsThunk(spotId));
    dispatch(getReviewsBySpotId(spotId));
    return () => {
      dispatch(cleanUpAllSpots());
    };
  }, [dispatch, spotId]);

  if (!spot) {
    return null;
  }

  const onClickDelete = (e, spotId) => {
    e.preventDefault();
    dispatch(deleteASpotThunk(spotId));
    history.push(`/`);
  };

  const editYourSpot = (e) => {
    e.preventDefault();
    history.push(`/spots/${spotId}/edit`);
  };

  return (
     { spot } && (
      <div className="spot-details-outer-container">
        <div className="spot-details-inner-container">
          <div className="spot-name-container">
            <div className="spot-name-text">{spot.name}</div>
          </div>

          <div className="spot-detail-sub-bar ">
            {spot.avgStarRating === "0.0" ? null : (
              <span className="spot-rating">
                &#9733; {spot.avgStarRating} .{" "}
              </span>
            )}

            <span className="spot-numReviews ">{spot.numReviews} Reviews </span>

            <span className="spot-sub-bar-info ">
              . {spot.city}, {spot.state}, {spot.country}
            </span>
          </div>

          <br />

          <div className="spot-img-container">
            <div className="spot-img-grid">
              <div className="spot-first-image">
                {spot?.Images && (
                  <img
                    className="spot-image"
                    src={spot?.Images[0]?.url || ""}
                    onError={(e) =>
                      (e.target.src =
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png")
                    }
                  />
                )}
              </div>
              <div className="spot-preview-images">
                <div className="preview-containers">
                  <div className="spot-preview-image">
                    {spot?.Images && (
                      <img
                        className="preview-images"
                        src={spot?.Images[1]?.url || ""}
                        onError={(e) =>
                          (e.target.src =
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png")
                        }
                      />
                    )}
                  </div>
                  <div className="spot-preview-image">
                    {spot?.Images && (
                      <img
                        className="preview-images"
                        src={spot?.Images[3]?.url || ""}
                        onError={(e) =>
                          (e.target.src =
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png")
                        }
                      />
                    )}
                  </div>
                </div>
                <div className="preview-containers">
                  <div className="spot-preview-image round-top-right">
                    {spot?.Images && (
                      <img
                        className="preview-images round-top-right"
                        src={spot?.Images[2]?.url || ""}
                        onError={(e) =>
                          (e.target.src =
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png")
                        }
                      />
                    )}
                  </div>

                  <div className="spot-preview-image round-bottom-right">
                    {spot?.Images && (
                      <img
                        className="preview-images round-bottom-right"
                        src={spot?.Images[4]?.url || ""}
                        onError={(e) =>
                          (e.target.src =
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png")
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
{/* ------------------------------------- */}
          <div className="spot-description-container">
            <p className="spot-description-text">{spot.description}</p>
          </div>
          <div className="spot-price-container">
            <p className="spot-price-text">${spot.price}</p>
            <span>per night</span>
          </div>

          <div>
            <CreateBookingForm spot={spot} bookings={bookings} />
          </div>
          <GetReviewsBySpotId />
        </div>
      </div>
    )
  );
}
export default SpotById;

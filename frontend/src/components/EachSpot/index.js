import "./eachSpot.css";

import { Link } from "react-router-dom";

function EachSpot({ spot }) {
  // console.log("spot previewImage", spot.previewImage);
  return (
    <Link key={`spot${spot.id}`} to={`/spots/${spot?.id}`}>
      <div className="all-spots-outer-container">
        <div className="homepage-image-container">
          <img
            alt-="house-image"
            className="homepage-spot-img"
            src={
              spot?.previewImage
              // "https://a0.muscache.com/im/pictures/miso/Hosting-580351555068335274/original/94994b90-eab4-4e51-950f-07909eb24dce.jpeg?im_w=960"
              // "https://a0.muscache.com/im/pictures/prohost-api/Hosting-619648648726300172/original/96071aa3-ec82-4527-a74d-460406afb070.jpeg?im_w=720"
            }

          />
        </div>
        <div className="homepage-spot-info-container">
          <div className="spot-info">
            <span className="homepage-spot-location">{`${spot?.city}, ${spot?.state}`}</span>
            <div className="homepage-spot-name">{spot?.name}</div>
            <div className="homepage-spot-price-container">
              <span className="homepage-spot-price-text">
                ${spot?.price.toLocaleString("en-US")}
              </span>
              <span>night</span>
            </div>
          </div>

          <div className="homepage-spot-review-data">
            {spot.avgRating === "0.0" ? (
              <span className="spot-rating">New</span>
            ) : (
              <span className="spot-rating">&#9733; {spot.avgRating}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
export default EachSpot;

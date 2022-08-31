import { NavLink } from "react-router-dom";
import "./eachSpot.css";

function EachSpot({ spot }) {
  return (
    <NavLink
      className="navlink-spots-container"
      to={`/spots/${spot.id}`}
      key={`spot${spot.id}`}
    >
      <div className="each-spot">
        <div className="spot-image-container">
          <img
            className="spot-image"
            src={
              spot.previewImage ||
              "https://a0.muscache.com/im/pictures/miso/Hosting-580351555068335274/original/94994b90-eab4-4e51-950f-07909eb24dce.jpeg?im_w=960"
            }
            width="250"
            height="250"
            alt-={"home"}
          />
        </div>

        <div className="spot-info-container">
          {/* <div className="info-location"> */}
          {/* <span className="spot-location">
              <span className="spot-state"> {spot.state},</span>{" "}
              <span className="spot-city"> {spot.city}</span>
            </span> */}
          {/* <div className="spot-description"> {spot.description}</div> */}
          {/* <div className="spot-state"> {spot.state}</div> */}
          {/* <div className="spot-rating">&#9733; {spot.avgRating}</div> */}
          {/* </div> */}

          <table>
            <tbody>
              <tr>
                <td>
                  <span className="spot-location">
                    <span className="spot-state"> {spot.state},</span>{" "}
                    <span className="spot-city"> {spot.city}</span>
                  </span>
                </td>
                <td>
                  <div className="spot-rating">&#9733; {spot.avgRating}</div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="spot-price-container">
            <span className="spot-price">${spot.price}</span>
            <span> night</span>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
export default EachSpot;

// import "./SpotCard.css";
// import { Link } from "react-router-dom";
// function Spotcard({ spot }) {
//   return (
//     <Link className="spot-container" to={`/spots/${spot?.id}`}>
//       <div className="spot-container">
//         <div className="spot-image-container">
//           <img
//             className="spot-img"
//             src={
//               spot?.previewImage ||
//               "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
//             }
//             onError={(e) =>
//               (e.target.src =
//                 "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png")
//             }
//           />
//         </div>
//         <div className="spot-info-container">
//           <div className="spot-card-info contain-text">
//             <div className="spot-card-location contain-text">{`${spot?.city}, ${spot?.state}`}</div>
//             <div className="spot-price-container">
//               <div className="spot-price">
//                 ${spot?.price.toLocaleString("en-US")}
//               </div>
//               <div className="spot-night">night</div>
//             </div>
//           </div>
//           <div className="spot-review-data">
//             <div className="spot-star">
//               <i className="fa-solid fa-star fa-xs"></i>
//             </div>
//             <div className="spot-rating">{spot?.avgRating}</div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }
// export default Spotcard;
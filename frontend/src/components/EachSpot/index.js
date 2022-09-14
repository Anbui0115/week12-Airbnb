import "./eachSpot.css";

import { Link } from "react-router-dom";

// function EachSpot({ spot }) {
//   return (
//     <NavLink
//       className="navlink-spots-container"
//       to={`/spots/${spot.id}`}
//       key={`spot${spot.id}`}
//     >
//       <div className="each-spot">
//         <div className="spot-image-container">
//           <img
//             className="spot-image"
//             src={
//               spot.previewImage ||
              // "https://a0.muscache.com/im/pictures/miso/Hosting-580351555068335274/original/94994b90-eab4-4e51-950f-07909eb24dce.jpeg?im_w=960"
//             }
//             width="250"
//             height="250"
//             alt-={"home"}
//           />
//         </div>

//         <div className="spot-info-container">
//           {/* <div className="info-location"> */}
//           {/* <span className="spot-location">
//               <span className="spot-state"> {spot.state},</span>{" "}
//               <span className="spot-city"> {spot.city}</span>
//             </span> */}
//           {/* <div className="spot-description"> {spot.description}</div> */}
//           {/* <div className="spot-state"> {spot.state}</div> */}
//           {/* <div className="spot-rating">&#9733; {spot.avgRating}</div> */}
//           {/* </div> */}

//           <table>
//             <tbody>
//               <tr>
//                 <td>
//                   <span className="spot-location">
//                     <span className="spot-state"> {spot.state},</span>{" "}
//                     <span className="spot-city"> {spot.city}</span>
//                   </span>
//                 </td>
//                 <td>
//                   <div className="spot-rating">&#9733; {spot.avgRating}</div>
//                 </td>
//               </tr>
//             </tbody>
//           </table>

function EachSpot({ spot }) {
  console.log("spot previewImage", spot.previewImage);
  return (
    <Link key={`spot${spot.id}`} to={`/spots/${spot?.id}`}>
      <div className="spot-outer-container">
        <div className="image-container">
          <img
            alt-="house-image"
            className="spot-img"
            src={
              spot?.previewImage
              // "https://a0.muscache.com/im/pictures/miso/Hosting-580351555068335274/original/94994b90-eab4-4e51-950f-07909eb24dce.jpeg?im_w=960"
              // "https://a0.muscache.com/im/pictures/prohost-api/Hosting-619648648726300172/original/96071aa3-ec82-4527-a74d-460406afb070.jpeg?im_w=720"
            }

            // onError={(e) =>
            //   (e.target.src =
            //     "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png")
            // }
          />
        </div>
        <div className="spot-info-container">
          <div className="spot-info">
            <span className="spot-location">{`${spot?.city}, ${spot?.state}`}</span>
            <div className="spot-price-container">
              <span className="spot-price">
                ${spot?.price.toLocaleString("en-US")}
              </span>
              <span>night</span>
            </div>
          </div>
          <div className="spot-review-data">
            <span className="spot-rating">&#9733; {spot.avgRating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default EachSpot;

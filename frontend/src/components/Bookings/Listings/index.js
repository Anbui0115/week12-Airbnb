import { useHistory } from "react-router-dom";
import { format, formatDistanceToNow, intlFormatDistance } from "date-fns";
//npm install date-fns --save in frontend
import { useState } from "react";
import "./Listing.css";

function Listing({ booking }) {
  const history = useHistory();
  const { name, previewImage, city, state, price } = booking.Spot;
  const { firstName, lastName } = booking.Spot.Owner;
  let { id } = booking;
  const [startDate, setStartDate] = useState(
    format(new Date(booking.startDate), "MMM dd, yyy")
  );
  const [endDate, setEndDate] = useState(
    format(new Date(booking.endDate), "MMM dd, yyy")
  );
  const [timeDifference, setTimeDifference] = useState(
    new Date(endDate).getTime() - new Date(startDate).getTime()
  );
  const [daysCount, setDaysCount] = useState(
    timeDifference / (1000 * 3600 * 24)
  );
  const [subTotal, setSubTotal] = useState(price * daysCount);
  const [cleaningFee, setCleaningFee] = useState(Math.ceil(price / 5));
  const [weeklyDiscount, setWeeklyDiscount] = useState(Math.ceil(subTotal / 7));
  const [serviceFee, setServiceFee] = useState(Math.ceil(subTotal / 4));
  const [total, setTotal] = useState(
    subTotal - weeklyDiscount + cleaningFee + serviceFee
  );

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const handleClick = (e) => {
    history.push(`/bookings/${id}`);
  };
  return (
    <div onClick={handleClick} className="single-booking-container">
      <div className="booking-image-container">
        <img className="single-booking-image" src={`${previewImage}`} />
      </div>
      <div className="booking-content-container">
        <div className="spot-name-container">
          <span>{name}</span>
          <span>
            Spot hosted by{" "}
            <span className="user-name">
              {firstName} {lastName}
            </span>
          </span>
        </div>
        <div className="booking-information-container">
          <div className="booking-location">
            <span>Where:</span>
            <span>
              {city}, {state}
            </span>
          </div>
          <div className="booking-location">
            <span>When:</span>
            <span>
              {startDate} - {endDate}
            </span>
          </div>
          <div className="booking-total">
            <span>Total: </span>
            <span>{formatter.format(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Listing;

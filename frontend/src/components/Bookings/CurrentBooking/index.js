import { useEffect, useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { getAllBookingsForCurrentUserThunk } from "../../../store/bookings";
import { Modal } from "../../../context/Modal";
import DeleteBooking from "../DeleteBooking";
import UpdateBookingForm from "../UpdateBooking";
import { deleteBookingThunk } from "../../../store/bookings";
import "./CurrentBooking.css";

function CurrentBooking() {
  const { bookingId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const bookings = useSelector((state) => state.bookings?.orderedBookingList);
  const booking = bookings?.find((booking) => booking.id === Number(bookingId));
  const spot = booking?.Spot;

  const history = useHistory();
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [changeable, setChangeable] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [price, setPrice] = useState(0);
  const [avgStarRating, setAvgStarRating] = useState(spot?.avgStarRating);
  const [numReviews, setNumReviews] = useState(spot?.numReviews);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timeDifference, setTimeDifference] = useState(0);
  const [daysCount, setDaysCount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [cleaningFee, setCleaningFee] = useState(0);
  const [weeklyDiscount, setWeeklyDiscount] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [checkIn, setCheckin] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    dispatch(getAllBookingsForCurrentUserThunk(sessionUser.id))
      .then(() => setIsLoaded(true))
      .catch((err) => {
        setIsLoaded(false);
      });
    if (spot && isLoaded) {
      setStartDate(format(new Date(booking?.startDate), "MMM dd, yyy"));
      setEndDate(format(new Date(booking?.endDate), "MMM dd, yyy"));
      setTimeDifference(
        new Date(endDate).getTime() - new Date(startDate).getTime()
      );
      setDaysCount(timeDifference / (1000 * 3600 * 24));
      setPrice(spot?.price);
      setSubTotal(price * daysCount);
      setCleaningFee(Math.ceil(price / 5));
      setWeeklyDiscount(Math.ceil(subTotal / 7));
      setServiceFee(Math.ceil(subTotal / 4));
      setTotal(subTotal - weeklyDiscount + cleaningFee + serviceFee);
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [
    dispatch,
    startDate,
    endDate,
    price,
    subTotal,
    cleaningFee,
    weeklyDiscount,
    total,
    daysCount,
    startDate,
    endDate,
    timeDifference,
    serviceFee,
    total,
    isLoaded,
  ]);

  useEffect(() => {
    const start = new Date(startDate).getTime();
    const today = new Date().getTime();
    if (start <= today) {
      setChangeable(false);
    }
  }, [startDate]);

  useEffect(() => {
    if (deleted) {
      dispatch(deleteBookingThunk(bookingId)).then(() =>
        history.push("/bookings")
      );
    }
  }, [deleted, dispatch, history]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (isLoaded && !spot) {
    return <Redirect to="/bookings" />;
  }

  return (
    isLoaded &&
    spot && (
      <div className="current-booking">
        <div className="confirmation-header">
          <h1 className="booking heading">
            {changeable
              ? "Your reservation is confirmed!"
              : "We hope you enjoyed your stay!"}
          </h1>
          {changeable && (
            <span>
              You're going to{" "}
              <u>
                {spot.city}, {spot.state}
              </u>
              !
            </span>
          )}
        </div>
        <div className="confirmation-container">
          <div className="confirmation-right-container">
            {spot && (
              <img className="booking-spot-img" src={spot.previewImage} />
            )}
            <div className="confirmation-description">
              <span>
                {spot.name} {spot.description}{" "}
              </span>
              <span>
                {spot.city}, {spot.state}
              </span>
            </div>
            <div className="confirmation-booking info">
              <div className="confirmation-left-itinerary">
                <h3 className="start date">Start Date</h3>
                <span>{startDate}</span>
                <span>Check-in time is 4PM - 9PM</span>
              </div>
              <div className="confirmation-right-itinerary">
                <h3 className="end date">End Date</h3>
                <span>{endDate}</span>
                <span>Check out time is 11AM</span>
              </div>
            </div>
          </div>
          <div className="confirmation-middle-container"></div>
          <div className="confirmation-left-container">
            <div className="confirmation-address-container">
              <h3>Address</h3>
              <p>
                {spot.address}, {spot.city}, {spot.state}, {spot.country}
              </p>
            </div>
            <div className="confirmation-total-amount">
              <h3>Amount</h3>
              <p>{formatter.format(total)}</p>
            </div>
            {booking.userId === sessionUser.id && changeable && (
              <div>
                {/* <button onClick={() => setShowUpdate(true)}>Change Reservaion</button> */}
                <button
                  className="confirmation-button"
                  onClick={() => setShowDelete(true)}
                >
                  Cancel Reservaion
                </button>
                {/* {showUpdate && (
              <Modal onClose={() => setShowUpdate(false)}>
                <UpdateBookingForm booking={booking} setShowUpdate={setShowUpdate} />
              </Modal>
            )} */}
                {showDelete && (
                  <Modal onClose={() => setShowDelete(false)}>
                    <DeleteBooking
                      setDeleted={setDeleted}
                      booking={booking}
                      setShowDelete={setShowDelete}
                    />
                  </Modal>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default CurrentBooking;

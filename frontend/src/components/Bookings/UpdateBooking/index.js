import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateBookingThunk } from "../../../store/bookings";
import "./UpdateBooking.css";

function UpdateBookingForm({ setShowUpdate }) {
  const { bookingId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  if (sessionUser === null) {
    alert("must be logged in to edit a spot");
    return <Redirect to="/" />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateBooking = {
      id: bookingId,
      startDate,
      endDate,
    };

    const respose = await dispatch(updateBookingThunk(updateBooking));
    setShowUpdate(false);
    history.push(`/bookings/${bookingId}`);
  };
  return (
    <form onSubmit={handleSubmit} className="update-booking-form">
      <h3>Update Booking Form</h3>
      <label>
        Check-In Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>
      <label>
        Check Out Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>
      <button type="submit">Change Reservaion</button>
    </form>
  );
}

export default UpdateBookingForm;

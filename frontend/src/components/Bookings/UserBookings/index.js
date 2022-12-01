import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllBookingsForCurrentUserThunk } from "../../../store/bookings";
import EachBooking from "../EachBooking";
import "./UserBookings.css";

function UserBookings() {
  const bookings = useSelector((state) => state.bookings);
  const bookingsArr = bookings?.orderedBookingList;
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllBookingsForCurrentUserThunk());
    setIsLoaded(true);
  }, [dispatch]);

  return (
    isLoaded && (
      <div className="bookings-outer-container">
        {bookings?.orderedBookingList.length < 1 && (
          <div>You don't have any bookings at the moment</div>
        )}

        {bookingsArr?.length > 0 && (
          <div className="bookings-inner-container">
            {bookingsArr.map((booking) => (
              <EachBooking key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    )
  );
}
export default UserBookings;

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
// import "../../DeleteSpot/Delete.css";

function DeleteBooking({ booking, setShowDelete, setDeleted }) {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="delete-container">
      <p className="delete-message">
        This booking will be deleted <strong> permanently</strong>. Are you sure
        you want to proceed?{" "}
      </p>
      <div className="delete-buttons">
        <button
          className="delete-button"
          onClick={() => {
            setDeleted(true);
            setShowDelete(false);
          }}
        >
          YES
        </button>
        <button
          className="delete-button"
          onClick={() => {
            setShowDelete(false);
            history.push("/bookings");
          }}
        >
          NO
        </button>
      </div>
    </div>
  );
}

export default DeleteBooking;

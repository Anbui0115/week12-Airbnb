// import { useSelector } from "react-redux";
// import { editASpotThunk } from "../../store/spots";
import './EditASpot.css'
import EditSpotForm from "./editForm";
function EditASpot() {
  // const spots = useSelector((state) => state.spots);??
  return (
    <>
      <div className="edit-spot-outer-container">
        <EditSpotForm />
      </div>

    </>
  );
}
export default EditASpot;

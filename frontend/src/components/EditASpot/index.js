// import { useSelector } from "react-redux";
// import { editASpotThunk } from "../../store/spots";
import EditSpotForm from "./editForm";
function EditASpot() {
  // const spots = useSelector((state) => state.spots);??
  return (
    <>
      <div>Edit a Spot</div>
      <EditSpotForm />
    </>
  );
}
export default EditASpot;

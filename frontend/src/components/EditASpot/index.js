// import { useSelector } from "react-redux";
import {editASpotThunk} from '../../store/spots'
import SpotForm from "../SpotForm";
function EditASpot(userInput) {
  // const spots = useSelector((state) => state.spots);??
  return (
    <>
      <div>Edit a Spot</div>
      <SpotForm />
    </>
  );
}
export default EditASpot;

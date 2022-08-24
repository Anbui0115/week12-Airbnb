import { useSelector } from "react-redux";
import SpotForm from "../SpotForm";
function CreateASpot(userInput) {
  // const spots = useSelector((state) => state.spots);??
  return (
    <>
      <div>Create a Spot</div>
      <SpotForm />
    </>
  );
}
export default CreateASpot;

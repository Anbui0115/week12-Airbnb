import { useSelector } from "react-redux";
import CreateSpotForm from "./createSpotForm";
function CreateASpot(userInput) {
  // const spots = useSelector((state) => state.spots);??
  return (
    <>
      <div>Create a Spot</div>
      <CreateSpotForm />
    </>
  );
}
export default CreateASpot;

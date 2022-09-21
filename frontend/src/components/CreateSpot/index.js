import { useSelector } from "react-redux";
import CreateSpotForm from "./createSpotForm";
import { Modal } from "../../context/Modal";
// import './CreateSpot.css'
import { useState } from "react";
function CreateASpotModal(userInput) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {/* <button
        className="create-spot-modal-button"
        onClick={() => setShowModal(true)}
      >
        Host Your Place
      </button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotForm />
        </Modal>
      )}
    </>
  );
}
export default CreateASpotModal;

import { useSelector } from "react-redux";
import CreateSpotForm from "./createSpotForm";
import { Modal } from "../../context/Modal";
import "./CreateSpot.css";
import { useState } from "react";
function CreateASpotModal(userInput) {
  const [showModal, setShowModal] = useState(false);
  const hideModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div
        className="create-spot-modal-button"
        onClick={() => setShowModal(true)}
      >
        Host Your Place
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>
            <CreateSpotForm hideModal={hideModal} />
          </div>
        </Modal>
      )}
    </>
  );
}
export default CreateASpotModal;

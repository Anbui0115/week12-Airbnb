import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CreateReviewForm from "./CreateReviewForm";
import './CreateReview.css'
function CreateReview() {
  //   const [showModal, setShowModal] = useState(false);
//   const reviews = useSelector((state) => state.reviews);
//   console.log("reviews inside create a new review form", reviews);
  //   useEffect(() => {
  //     setShowModal(false);
  //   }, [reviews]);

  return (
    <>
      <div className="create-review-outer-container">
 <CreateReviewForm />
      </div>

    </>
  );
}

export default CreateReview;

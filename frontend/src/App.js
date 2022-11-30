// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpots from "./components/GetAllSpots";
import GetSpotDetails from "./components/SpotDetails";
import EditASpot from "./components/EditASpot";
import SpotsByOwner from "./components/SpotByOwner";
import GetReviewsCurrentUser from "./components/GetReviewCurrentUser";
import GetReviewsBySpotId from "./components/GetReviewsBySpotId";
import CreateReview from "./components/CreateReview";

import UserBookings from "./components/Bookings/AllBookings"
import CurrentBooking from "./components/Bookings/CurrentBooking"
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* <Route exact path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route exact path="/">
            <GetAllSpots />
          </Route>
          {/* <Route exact path="/spots/new">
            <CreateASpot />
          </Route> */}
          <Route exact path="/spots/current">
            <SpotsByOwner />
          </Route>
          <Route exact path="/spots/:spotId">
            <GetSpotDetails />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <EditASpot />
          </Route>
          {/* <Route exact path="/demo-user">
            <DemoFormModal/>
          </Route> */}
          <Route exact path="/reviews/current">
            <GetReviewsCurrentUser />
          </Route>
          <Route exact path="/spots/:spotId/reviews">
            <GetReviewsBySpotId />
          </Route>
          <Route exact path="/spots/:spotId/create-review">
            <CreateReview />
          </Route>
          <Route exact path="/bookings">
            <UserBookings />
          </Route>
          <Route exact path="/bookings/:bookingId">
            <CurrentBooking />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

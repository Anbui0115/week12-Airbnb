// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpots from "./components/GetAllSpots";
import GetSpotDetails from "./components/SpotDetails";
import CreateASpot from "./components/CreateSpot";
import EditASpot from "./components/EditASpot";
import SpotsByOwner from "./components/SpotByOwner";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const spots = useSelector((state) => state.spots);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/spots">
            <GetAllSpots />
          </Route>
          <Route exact path="/spots/new">
            <CreateASpot />
          </Route>
          <Route exact path="/spots/current">
            <SpotsByOwner />
          </Route>
          <Route exact path="/spots/:spotId">
            <GetSpotDetails />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <EditASpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

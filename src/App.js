import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header';
import ShowVehicle from './Components/ShowVehicle/ShowVehicle';
import Booking from "./Components/Booking/Booking";
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from "./Components/Login/Login";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div className="App">
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Header></Header>
          <Switch>
            <PrivateRoute path="/booking/:name">
              <Booking />
            </PrivateRoute>
            <PrivateRoute path="/destination">
              <Booking />
            </PrivateRoute>
            <PrivateRoute path="/contact">
              <Booking />
            </PrivateRoute>
            <PrivateRoute path="/blog">
              <Booking />
            </PrivateRoute>
            <Route path="/home">
              <ShowVehicle />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <ShowVehicle />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>

    </div>
  );
}

export default App;

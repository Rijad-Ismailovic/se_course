import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import NavbarComponent from "./components/NavbarComponent";
import HeaderComponent from "./components/HomepageHeaderComponent";
import HomepageComponent from "./components/HomepageBodyComponent";
import FooterComponent from "./components/FooterComponent";
import VehicleListingComponent from "./components/VehicleListingComponent";
import ProfileHeaderComponent from "./components/ProfileHeaderComponent";
import LoginComponent from "./components/LoginComponent";
import { Toaster } from "react-hot-toast";
import RegistrationComponent from "./components/RegistrationComponent";
import ProfileBodyComponent from "./components/ProfileBodyComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster/>
        <NavbarComponent></NavbarComponent>
        <Routes>
          {/* http://localhost:3000/api/vehicles/ */}
          <Route
            path="/"
            element={
              <>
                <HeaderComponent></HeaderComponent>
                <HomepageComponent></HomepageComponent>
              </>
            }
          ></Route>

          {/* http://localhost:3000/api/vehicles/vehicle-listing/id */}
          <Route
            path="/vehicle-listing/:id"
            element={<VehicleListingComponent></VehicleListingComponent>}
          ></Route>

          {/* http://localhost:3000/api/vehicles/profile/id */}
          <Route
            path="/profile/:id"
            element={
              <>
                <ProfileHeaderComponent></ProfileHeaderComponent>
                <ProfileBodyComponent></ProfileBodyComponent>
              </>
            }
          ></Route>

          {/* http://localhost:3000/api/login */}
          <Route
            path="/login"
            element={<LoginComponent></LoginComponent>}>
          </Route>

          {/* http://localhost:3000/api/registration */}
          <Route
            path="/registration"
            element={<RegistrationComponent></RegistrationComponent>}>
            </Route>
        </Routes>
        <FooterComponent></FooterComponent>
      </BrowserRouter>
    </>
  );
}

export default App;

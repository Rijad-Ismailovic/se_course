import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserById } from "../services/UserService";
import { toast } from "react-hot-toast";

const NavbarComponent = () => {
  const navigator = useNavigate();
  const location = useLocation();

  const [profilePicture, setProfilePicture] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      getUserById(userId).then((response) => {
        setProfilePicture(response.data.imagePath);
      });
    }
  }, [userId]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container px-4 px-lg-5">
        <a className="navbar-brand" href="#!" onClick={() => navigator("/")}>
          <span className="fw-bold">RIČO VEHICLES</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <a
                className={`nav-link ${
                  useLocation().pathname == "/" ? "active" : ""
                }`}
                aria-current="page"
                href="#!"
                onClick={() => {
                  navigator("/");
                }}
              >
                Homepage
              </a>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  useLocation().pathname.startsWith("/profile") ? "active" : ""
                }`}
                onClick={() => {
                  if (localStorage.getItem("userId") != null) {
                    navigator(`/profile/${localStorage.getItem("userId")}`);
                  } else {
                    navigator("/login");
                  }
                }}
              >
                Profile
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  useLocation().pathname.startsWith("/admin") ? "active" : ""
                }`}
                onClick={() => {
                  if (
                    localStorage.getItem("userId") == null ||
                    localStorage.getItem("userId") != 902
                  ) {
                    toast.error("Not authorized");
                  } else{
                    navigator("/admin");
                  }
                }}
              >
                Admin
              </button>
            </li>
          </ul>
          <form className="d-flex">
            <button
              className="btn btn-outline-light"
              type="submit"
              onClick={() => {
                if (localStorage.getItem("userId") == null) {
                  navigator("/login");
                } else {
                  localStorage.removeItem("userId");
                  if (location.pathname.startsWith("/profile/")) {
                    navigator("/");
                  }
                }
              }}
            >
              {userId ? (
                <>
                  Log out
                  <img
                    className="rounded-circle ms-2"
                    style={{ width: "20px", height: "20px" }}
                    src={
                      profilePicture
                        ? `http://localhost:8080/${profilePicture}`
                        : "https://dummyimage.com/150x150/6c757d/dee2e6.jpg"
                    }
                    alt="User"
                  />
                </>
              ) : (
                "Log in"
              )}
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;

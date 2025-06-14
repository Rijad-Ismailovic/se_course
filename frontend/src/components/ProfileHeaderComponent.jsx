import React, { useEffect, useState } from "react";
import { getUserById } from "../services/UserService";
import EditProfileModal from "./modals/EditProfileModalComponent";
import { useParams } from "react-router-dom";

const ProfileHeaderComponent = () => {
  const { id } = useParams();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    if (id == localStorage.getItem("userId")) {
      setIsMyProfile(true);
    }

    getUserById(id)
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setImagePath(response.data.imagePath);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <header className="bg-primary py-1">
      <div className="text-center my-5">
        <img
          className="img-fluid rounded-circle mb-4"
          src={
            imagePath != null
              ? `http://localhost:8080/${imagePath}`
              : "http://localhost:8080/uploads/profile_pictures/default.jpg"
          }
          width={150}
          height={150}
        />
        <h1 className="text-white fs-3 fw-bolder">
          {firstName + " " + lastName}
        </h1>

        <p className="text-white-50 mb-0">
          {email}
          {isMyProfile && <EditProfileModal />}
        </p>
      </div>
    </header>
  );
};

export default ProfileHeaderComponent;

import React, { useEffect, useState } from "react";
import { getUserById } from '../services/UserService'

const ProfileHeaderComponent = () => {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [imagePath, setImagePath] = useState("")



  useEffect(() => {
    getUserById(localStorage.getItem("userId"))
      .then((response) => {
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
        setImagePath(response.data.imagePath)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return ( 
      <header className="bg-dark py-1">
        <div className="text-center my-5">
          <img  
            className="img-fluid rounded-circle mb-4"
            src={imagePath != null ? `http://localhost:8080/${imagePath}` : "https://dummyimage.com/150x150/6c757d/dee2e6.jpg"} 
            width={150}
            height={150}
          />
        <h1 className="text-white fs-3 fw-bolder">{firstName + " " + lastName}</h1>
          <p className="text-white-50 mb-0">{email}</p>
        </div>
      </header>
  );
};

export default ProfileHeaderComponent;

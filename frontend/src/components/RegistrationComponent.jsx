import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha"
import { doesUserWithEmailExist, registration } from '../services/UserService'
import toast, { Toaster } from 'react-hot-toast';

const RegistrationComponent = () => {

  const navigator = useNavigate()
  const [captchaValue, setCaptchaValue] = useState(null)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: ""
  })
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function handleImageChange(e) {
    if (e.target.files) {
       // TODO Check if file is actually an image
      setFile(e.target.files[0])
    }
  }

  function registerUser(e) {
    e.preventDefault()

    if (validateForm()) {
      const registrationInput = { firstName, lastName, email, password, file }
      registration(registrationInput)
        .then((response) => {
          toast.success("Succesfully registered.")
          navigator("/login")
        })
        .catch((error) =>  {
          console.error("Registration failed:", error.response.data || error.message)
        })
    }

    function validateForm() {
      let valid = true
      const errorsCopy = { ...errors }
      
      if (firstName != "") {
        errorsCopy.firstName = ""
      } else {
        errorsCopy.firstName = "First name is required"
        valid = false
      }

      if (lastName != "") {
        errorsCopy.lastName = ""
      } else {
        errorsCopy.lastName = "Last name is required"
        valid = false
      }

      if (emailRegex.test(email)) {
        if (!doesUserWithEmailExist) {
          errorsCopy.email=""
        } else {
          errorsCopy.email = "Email already registered"
          valid = false
        }
      } else {
        errorsCopy.email = "Not a valid email"
        valid = false
      }

      if (password != "") {
        errorsCopy.password = ""
      } else {
        errorsCopy.password = "Password is required"
        valid = false
      }

      if (repeatPassword == password) {
        errorsCopy.repeatPassword = ""
      } else {
        errorsCopy.repeatPassword = "Repeat password should be same as password"
        valid = false
      }

      setErrors(errorsCopy)
      return valid;
    }
  }

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-5 bg-light col-4">
        <form>
          {/* First and Last name input*/}
          <div className="row">
            <div data-mdb-input-init className="form-outline mb-4 col-6">
            <input 
              type="text" 
              id="firstName" 
                name="firstName" 
                placeholder="First name"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`} 
              onChange={(e) => setFirstName(e.target.value)} 
            />
              {/* <label className="form-label">Email address</label> */}
              {errors.firstName && <div className="invalid-feedback"> { errors.firstName}</div>}
            </div>
            <div data-mdb-input-init className="form-outline mb-4 col-6">
            <input 
              type="text" 
              id="lastName" 
              name="lastName" 
              placeholder="Last name"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`} 
              onChange={(e) => setLastName(e.target.value)} 
            />
              {/* <label className="form-label">Email address</label> */}
              {errors.lastName && <div className="invalid-feedback"> { errors.lastName}</div>}
            </div>
          </div>
            
          {/* Email input */}
          <div data-mdb-input-init className="form-outline mb-4">
            <input 
              type="email" 
              id="email" 
                name="email" 
                placeholder="Enter email address"
              className={`form-control ${errors.email ? "is-invalid" : ""}`} 
              onChange={(e) => setEmail(e.target.value)} 
            />
              {/* <label className="form-label">Email address</label> */}
              {errors.email && <div className="invalid-feedback"> { errors.email}</div>}
          </div>

          {/* Password input */}
          <div data-mdb-input-init className="form-outline mb-4">
            <input 
              type="password" 
              id="password" 
                name="password" 
                placeholder="Enter password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              onChange={(e) => setPassword(e.target.value)} 
              />
              {errors.password && <div className="invalid-feedback"> {errors.password}</div>}
          </div>
              
          {/* Repeat password input */}
          <div data-mdb-input-init className="form-outline mb-4">
            <input 
              type="password" 
              id="repeatPassword" 
                name="repeatPassword" 
                placeholder="Repeat password"
              className={`form-control ${errors.repeatPassword ? "is-invalid" : ""}`}
              onChange={(e) => setRepeatPassword(e.target.value)} 
              />
            {errors.repeatPassword && <div className="invalid-feedback"> { errors.repeatPassword}</div>}

          {/* Picture input */}           
          </div>

          {/* File upload */}
          <div className="form-outline mb-4">
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept='image/png, image/jpg, image/jpeg'
              onChange={handleImageChange}
            >
            </input>
            <br></br>
            <small className="form-text text-muted">Please upload an image for your profile picture.</small>
          </div>
           
          
          <div className="d-flex justify-content-center mt-4">
            <ReCAPTCHA
            sitekey="6LdF7NgqAAAAAJIQvn7YcQKwde_fB1e9aiGoq7xm"
             onChange={(val) => setCaptchaValue(val)}
            />
          </div>
          
          
          {/* Submit button */}
          <div className="text-center mt-4">
            <button 
              type="button" 
              data-mdb-button-init 
              data-mdb-ripple-init 
              className="btn btn-primary mb-4" 
              onClick={registerUser}
              disabled={!captchaValue}
            >
              Register
            </button>
          </div>

          {/* Login link */}
          <div className="text-center">
            <p>
              Already have an account?<button className="btn btn-link" onClick={() => navigator("/login", { state: true })}>Log in</button>
            </p>
          </div>
        </form>
    </div>
  </div>
  )
}

export default RegistrationComponent
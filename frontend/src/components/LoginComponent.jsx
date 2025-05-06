import React, { useState } from 'react'
import { login } from "../services/UserService"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';


const LoginComponent = () => {

  const navigator = useNavigate()
  const localStorage = window.localStorage;

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  })
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  function loginUser(e) {
    e.preventDefault()
    
    if (validateForm()) {
      const loginCredentials = { email, password };
      login(loginCredentials)
        .then((response) => {
          console.log(response.data.message) 
          if (response.data.message == "Login successful") {
            localStorage.setItem("userId", response.data.userId)
            navigator("/")
            toast.success('Successfully logged in')
          }
        })
        .catch((error) => {
          console.log("Login failed: ", error)
          if (error.response.status == 401) {
            toast.error("Invalid credentials")
          }
        })
    }
  }

  function validateForm() {
    let valid = true
    const errorsCopy = { ...errors }
    
    if (emailRegex.test(email)) {
      errorsCopy.email = ""
    } else {
      errorsCopy.email = "Not a valid email"
      valid = false
    }

    if (password != "") { 
      errorsCopy.password = ""
    } else {
      errorsCopy.password = "Password field is required"
      valid = false
    }

    setErrors(errorsCopy)
    return valid
  }

  return (
  <div className="container min-vh-100 d-flex justify-content-center align-items-center">
    <div className="card p-5 bg-light col-4">
      <form>
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
            {errors.password && <div className="invalid-feedback"> { errors.password}</div>}

        </div>

        {/* Remember Me Checkbox */}
        <div className="row mb-4">
          <div className="col">
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="form2Example31" 
                />
                Remember me
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="text-center">
          <button 
            type="button" 
            data-mdb-button-init 
            data-mdb-ripple-init 
            className="btn btn-primary mb-4" 
            onClick={loginUser}
          >
              Log in
          </button>
        </div>

        {/* Register link */}
        <div className="text-center">
          <p>
            Don't have an account?<button className="btn btn-link" onClick={() => navigator("/registration", { replace: true })}>Register</button>
          </p>
        </div>
      </form>
    </div>
  </div>
);

}

export default LoginComponent
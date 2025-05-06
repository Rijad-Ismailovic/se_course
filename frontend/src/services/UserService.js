import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/users";

export const login = (loginCredentials) => axios.post(REST_API_BASE_URL + "/login", loginCredentials)

export const doesUserWithEmailExist = (email) => axios.post(REST_API_BASE_URL + "/emailCheck", email)

export const getUserById = (id) => axios.get(REST_API_BASE_URL + "/" + id)

export const registration = (registrationInput) => {
    const formData = new FormData();
    formData.append("userDto", new Blob([JSON.stringify({
        firstName: registrationInput.firstName,
        lastName: registrationInput.lastName,
        email: registrationInput.email,
        password: registrationInput.password
    })], { type: "application/json" }));
    
    if (registrationInput.file) {
        formData.append("imageFile", registrationInput.file);
    }

    return axios.post(REST_API_BASE_URL, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};
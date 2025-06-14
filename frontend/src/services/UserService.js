import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/users";

export const login = (loginCredentials) =>
  axios.post(REST_API_BASE_URL + "/login", loginCredentials);

export const doesUserWithEmailExist = (email) =>
  axios.post(REST_API_BASE_URL + "/emailCheck", { email: email });

export const getUserById = (id) => axios.get(REST_API_BASE_URL + "/" + id);

export const authenticatePassword = (input) =>
  axios.post(REST_API_BASE_URL + "/authenticatePassword", input);

export const registration = (registrationInput) => {
  const formData = new FormData();
  formData.append(
    "userDto",
    new Blob(
      [
        JSON.stringify({
          firstName: registrationInput.firstName,
          lastName: registrationInput.lastName,
          email: registrationInput.email,
          password: registrationInput.password,
        }),
      ],
      { type: "application/json" }
    )
  );

  if (registrationInput.file) {
    formData.append("imageFile", registrationInput.file);
  }

  return axios.post(REST_API_BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateUserById = (id, editInput) => {
  const formData = new FormData();
  formData.append(
    "userDto",
    new Blob(
      [
        JSON.stringify({
          firstName: editInput.firstName,
          lastName: editInput.lastName,
          email: editInput.email,
          password: editInput.password,
        }),
      ],
      { type: "application/json" }
    )
  );

  if (editInput.file) {
    formData.append("imageFile", editInput.file);
  }

  return axios.put(REST_API_BASE_URL + "/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUsers = () => axios.get(REST_API_BASE_URL)

export const deleteUserById = (id) => axios.delete(REST_API_BASE_URL + "/" + id)
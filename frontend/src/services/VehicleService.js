import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/vehicles";

export const getVehicles = () => { return axios.get(REST_API_BASE_URL); }

export const getVehicleById = (id) => axios.get(REST_API_BASE_URL + "/" + id)

export const getVehiclesByUserId = (userId) => axios.get(REST_API_BASE_URL + "/profile/" + userId)
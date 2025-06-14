import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/vehicles";

export const getVehicles = () => {
  return axios.get(REST_API_BASE_URL);
};

export const getVehicleById = (id) => axios.get(REST_API_BASE_URL + "/" + id);

export const getVehiclesByUserId = (userId) =>
  axios.get(REST_API_BASE_URL + "/profile/" + userId);

export const addVehicle = (vehicle, userId) => {
    console.log("ADDING");

  const formData = new FormData();
  formData.append(
    "vehicleDto",
    new Blob(
      [
        JSON.stringify({
          title: vehicle.title,
          manufacturer: vehicle.manufacturer,
          model: vehicle.model,
          yearOfManufacture: vehicle.yearOfManufacture,
          engineSize: vehicle.engineSize,
          fuelType: vehicle.fuelType,
          kw: vehicle.kw,
          distanceTraveled: vehicle.distanceTraveled,
          city: vehicle.city,
          price: vehicle.price,
          description: vehicle.description,
        }),
      ],
      { type: "application/json" }
    )
  );

  formData.append("imageFile", vehicle.file);

  formData.append("userId", userId);

  return axios.post(REST_API_BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateVehicle = (vehicle) => {
  console.log("UPDATING")
  const formData = new FormData();
  formData.append(
    "vehicleDto",
    new Blob(
      [
        JSON.stringify({
          title: vehicle.title,
          manufacturer: vehicle.manufacturer,
          model: vehicle.model,
          yearOfManufacture: vehicle.yearOfManufacture,
          engineSize: vehicle.engineSize,
          fuelType: vehicle.fuelType,
          kw: vehicle.kw,
          distanceTraveled: vehicle.distanceTraveled,
          city: vehicle.city,
          price: vehicle.price,
          description: vehicle.description,
        }),
      ],
      { type: "application/json" }
    )
  );

  formData.append("imageFile", vehicle.file);

  return axios.put(REST_API_BASE_URL + "/" + vehicle.vehicleId, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteVehicleById = (id) => axios.delete(REST_API_BASE_URL + "/" + id)

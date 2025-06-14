import React, { useState, useEffect } from "react";
import { getVehicleById } from "../services/VehicleService";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/UserService";
import { useNavigate, Link } from "react-router-dom"

const VehicleListingComponent = () => {
  const navigator = useNavigate()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userImage, setUserImage] = useState("")
  const [userId, setUserId] = useState("")
  const [title, setTitle] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [yearOfManufacture, setYearOfManufacture] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [kw, setKw] = useState("");
  const [distanceTraveled, setDistanceTraveled] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");

  const { id } = useParams();
  useEffect(() => {
    getVehicleById(id).then((response) => {
      setUserId(response.data.userId)
      setTitle(response.data.title);
      setManufacturer(response.data.manufacturer);
      setModel(response.data.model);
      setYearOfManufacture(response.data.yearOfManufacture);
      setEngineSize(response.data.engineSize);
      setFuelType(response.data.fuelType);
      setKw(response.data.kw);
      setDistanceTraveled(response.data.distanceTraveled);
      setCity(response.data.city);
      setPrice(response.data.price);
      setDescription(response.data.description);
      setFile(response.data.imagePath);
    });
  }, [id]);

  useEffect(() => {
    if (userId) {
      getUserById(userId)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setUserImage(response.data.imagePath)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userId]);

  return (
    <section className="py-5 mt-5">
      <div className="container my-2 min-vh-100">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img
              className="card-img-top mb-5 mb-md-0 center-cropped"
              src={
                file
                  ? `http://localhost:8080/${file}`
                  : "https://dummyimage.com/600x700/dee2e6/6c757d.jpg"
              }
              alt="..."
            />
          </div>
          <div className="col-md-6">
            <div className="small mb-1">
              <Link
                to={`/profile/${userId}`}
                className="text-decoration-none text-dark"
              >
                <img
                  className="rounded-circle"
                  style={{ width: "20px", height: "20px" }}
                  src={
                    file
                      ? `http://localhost:8080/${userImage}`
                      : "https://dummyimage.com/150x150/6c757d/dee2e6.jpg"
                  }
                  alt="..."
                />
                {" " + firstName + " " + lastName}
              </Link>
            </div>
            <h1 className="display-5 fw-bol der">{title}</h1>
            <div className="fs-5 mb-4 px-1">
              <span className="fw-bold ">{price.toLocaleString()} KM</span>
            </div>
            <div className="border rounded  p-3 m-1">
              <div className="row">
                <div className="col">
                  <p>
                    <strong>Proizvođač:</strong> {manufacturer}
                  </p>
                  <p>
                    <strong>Model:</strong> {model}
                  </p>
                  <p>
                    <strong>Godina:</strong> {yearOfManufacture}
                  </p>
                  <p>
                    <strong>Kubikaža:</strong> {engineSize}
                  </p>
                </div>
                <div className="col">
                  <p>
                    <strong>Gorivo:</strong> {fuelType}
                  </p>
                  <p>
                    <strong>kw:</strong> {kw}
                  </p>
                  <p>
                    <strong>Kilometraza:</strong> {distanceTraveled}
                  </p>
                  <p>
                    <strong>Grad:</strong> {city}
                  </p>
                </div>
              </div>
              <div className="row px-2">{description}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleListingComponent;

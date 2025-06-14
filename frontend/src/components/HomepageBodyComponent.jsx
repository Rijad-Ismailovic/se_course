import React, { useState, useEffect } from "react";
import { getVehicles } from "../services/VehicleService";
import { useNavigate } from "react-router-dom";

const HomepageBodyComponent = () => {
  const navigator = useNavigate();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getAllVehicles();
  }, []);

  function getAllVehicles() {
    getVehicles()
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function enterVehicleListing(id) {
    navigator(`/vehicle-listing/${id}`);
  }

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5 min-vh-100">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {vehicles.map((vehicle) => (
            <div className="col mb-5" key={vehicle.id}>
              <div className="card h-100">
                {/*<!-- Product image-->*/}
                <img
                  className="card-img-top"
                  src={
                    vehicle.imagePath != null
                      ? `http://localhost:8080/${vehicle.imagePath}`
                      : "https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                  }
                  alt="..."
                />
                {/*<!-- Product details-->*/}
                <div className="card-body p-4">
                  <div className="text-center">
                    {/*<!-- Product name-->*/}
                    <h5 className="fw-bolder">{vehicle.title}</h5>
                    {/*<!-- Product general details -->*/}
                    <p className="text-muted">
                      {vehicle.manufacturer +
                        " " +
                        vehicle.model +
                        " " +
                        vehicle.yearOfManufacture}
                    </p>
                    {/*<!-- Product price-->*/}
                    {vehicle.price.toLocaleString()} KM
                  </div>
                </div>
                {/*<!-- Product actions-->*/}
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center">
                    <button
                      className="btn btn-outline-dark mt-auto"
                      onClick={() => enterVehicleListing(vehicle.id)}
                    >
                      View options
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomepageBodyComponent;

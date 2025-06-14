import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import { getUsers } from "../services/UserService";
import { getVehicles } from "../services/VehicleService";
import EditProfileAdminModal from "../components/modals/EditProfileAdminModalComponent"
import DeleteProfileModalComponent from "../components/modals/DeleteProfileModalComponent";
import DeleteVehicleModalComponent from "./modals/DeleteVehicleModalComponent";
import EditVehicleModalComponent from "./modals/EditVehicleModalComponent";


const AdminComponent = () => {
  const rowsPerPage = 7;
  const [userArray, setUserArray] = useState([]);
  const [listingArray, setListingArray] = useState([]);
  

  const user_columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      width: "80px",
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.firstName,
      width: "120px",
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      width: "120px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "200px",
    },
    {
      name: "Image path",
      selector: (row) => row.imagePath,
      width: "500px",
    },
    {
      name: "Actions",
      selector: (row) => (
        <div className="p-1">
          <EditProfileAdminModal profileId={row.id} />
          <DeleteProfileModalComponent profileId={row.id} />
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  const listing_columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      width: "80px",
      sortable: true,
    },
    {
      name: "User ID",
      selector: (row) => row.userId,
      width: "80px",
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      width: "250px",
    },
    {
      name: "Manufacturer",
      selector: (row) => row.manufacturer,
      width: "125px",
    },
    {
      name: "Model",
      selector: (row) => row.model,
      width: "125px",
    },
    {
      name: "Year",
      selector: (row) => row.yearOfManufacture,
      width: "70px",
    },
    {
      name: "Engine Size",
      selector: (row) => row.engineSize,
      width: "70px",
    },
    {
      name: "Fuel",
      selector: (row) => row.fuelType,
      width: "70px",
    },
    {
      name: "kw",
      selector: (row) => row.kw,
      width: "70px",
    },
    {
      name: "Mileage",
      selector: (row) => row.distanceTraveled,
      width: "100px",
    },
    {
      name: "City",
      selector: (row) => row.city,
      width: "125px",
    },
    {
      name: "Price",
      selector: (row) => row.price,
      width: "100px",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      width: "125px",
    },
    {
      name: "Image path",
      selector: (row) => row.imagePath,
      width: "125px",
    },
    {
      name: "Actions",
      selector: (row) => (
        <div className="p-1">
          <EditVehicleModalComponent vehicleId={row.id} />
          <DeleteVehicleModalComponent vehicleId={row.id} />
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUserArray(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
    
    getVehicles()
      .then((response) => {
        setListingArray(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <section className="py-2">
      <div className="container px-4 px-lg-5 mt-5 min-vh-100">
        <h1>Users</h1>
        <DataTable
          columns={user_columns}
          data={userArray}
          striped={true}
          highlightOnHover
          fixedHeader
          dense
          pagination
          paginationPerPage={rowsPerPage}
        ></DataTable>
        <h1>Listings</h1>
        <DataTable
          columns={listing_columns}
          data={listingArray}
          striped={true}
          highlightOnHover
          fixedHeader
          dense
          pagination
          paginationPerPage={rowsPerPage}
        ></DataTable>
      </div>
    </section>
  );
};

export default AdminComponent;

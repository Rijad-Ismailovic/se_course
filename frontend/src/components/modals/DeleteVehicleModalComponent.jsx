import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteVehicleById } from "../../services/VehicleService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DeleteVehicleModalComponent = ({ vehicleId }) => {
  const [show, setShow] = useState(false);
  const navigator = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    deleteVehicleById(vehicleId)
      .then((response) => {
        setShow(false);
        navigator("/temp-route");
        setTimeout(
          () => navigator(`/profile/${localStorage.getItem("userId")}`),
          100
        );
        toast.success("Listing successfully deleted");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error deleting listing");
      });
  };

  return (
    <>
      <button
        className="btn btn-outline-danger mt-auto mx-1"
        onClick={handleShow}
      >
        Delete
      </button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Vehicle Listing?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete listing? ID: {vehicleId}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteVehicleModalComponent;

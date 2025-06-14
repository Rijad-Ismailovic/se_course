import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUserById } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DeleteProfileModalComponent = ({ profileId }) => {
  const [show, setShow] = useState(false);
  const navigator = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    deleteUserById(profileId)
      .then((response) => {
        setShow(false);
        navigator("/temp-route");
        setTimeout(
          () => navigator(`/admin`),
          100
        );
        toast.success("Profile successfully deleted");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error deleting profile");
      });
  };

  return (
    <>
      <button className="btn btn-outline-danger mt-auto mx-1" onClick={handleShow}>Delete</button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Profile?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete profile? ID: {profileId}
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

export default DeleteProfileModalComponent;

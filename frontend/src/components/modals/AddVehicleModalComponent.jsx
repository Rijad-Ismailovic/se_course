import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { addVehicle } from "../../services/VehicleService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cropper from "react-cropper";

function AddVehicleModal() {
  const [show, setShow] = useState(false);
  const navigator = useNavigate();

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

  const manufacturers = [
    "Audi",
    "BMW",
    "Chevrolet",
    "Chrysler",
    "Dodge",
    "Ferrari",
    "Fiat",
    "Ford",
    "Honda",
    "Hyundai",
    "Jaguar",
    "Jeep",
    "Kia",
    "Lamborghini",
    "Land Rover",
    "Lexus",
    "Mazda",
    "Mercedes-Benz",
    "Mitsubishi",
    "Nissan",
    "Peugeot",
    "Porsche",
    "Renault",
    "Subaru",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo",
  ];
  const cities = [
    "Banja Luka",
    "Bihać",
    "Bijeljina",
    "Bosanska Krupa",
    "Bosanski Petrovac",
    "Brčko",
    "Bugojno",
    "Busovača",
    "Cazin",
    "Čapljina",
    "Čitluk",
    "Derventa",
    "Doboj",
    "Donji Vakuf",
    "Foča",
    "Goražde",
    "Gračanica",
    "Gradačac",
    "Grude",
    "Hadžići",
    "Jajce",
    "Kakanj",
    "Kladanj",
    "Kneževo",
    "Konjic",
    "Kotor Varoš",
    "Kupres",
    "Laktaši",
    "Livno",
    "Lukavac",
    "Ljubuški",
    "Maglaj",
    "Modriča",
    "Mostar",
    "Mrkonjić Grad",
    "Neum",
    "Nevesinje",
    "Novi Grad",
    "Odžak",
    "Orašje",
    "Pale",
    "Posušje",
    "Prijedor",
    "Prnjavor",
    "Prozor-Rama",
    "Sanski Most",
    "Sarajevo",
    "Srebrenik",
    "Srebrenica",
    "Stolac",
    "Široki Brijeg",
    "Teslić",
    "Tešanj",
    "Tomislavgrad",
    "Travnik",
    "Trebinje",
    "Tuzla",
    "Ugljevik",
    "Visoko",
    "Vitez",
    "Zavidovići",
    "Zenica",
    "Zvornik",
  ];
  const [errors, setErrors] = useState({
    title: "",
    manufacturer: "",
    model: "",
    yearOfManufacture: "",
    engineSize: "",
    fuelType: "",
    kw: "",
    distanceTraveled: "",
    city: "",
    price: "",
    description: "",
    file: "",
  });

  const cropperRef = useRef(null);
  const [croppedFile, setCroppedFile] = useState("");
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const image = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setFile(reader.result);
      };

      reader.readAsDataURL(image);
    }
  };

  const handleClose = () => {
    setTitle("");
    setManufacturer("");
    setModel("");
    setYearOfManufacture("");
    setEngineSize("");
    setFuelType("");
    setKw("");
    setDistanceTraveled("");
    setCity("");
    setPrice("");
    setDescription("");
    setFile("");
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleAddListing = () => {
    if (validate()) {
      const cropper = cropperRef.current?.cropper;
      if (cropper) {
        const croppedCanvas = cropper.getCroppedCanvas();
        croppedCanvas.toBlob((blob) => {
          const file = new File([blob], "cropped-image.jpg", {
            type: "image/jpeg",
          });

          addVehicle(
            {
              title,
              manufacturer,
              model,
              yearOfManufacture,
              engineSize,
              fuelType,
              kw,
              distanceTraveled,
              city,
              price,
              description,
              file,
            },
            localStorage.getItem("userId")
          )
            .then((response) => {
              setShow(false);
              navigator("/temp-route");
              setTimeout(
                () => navigator(`/profile/${localStorage.getItem("userId")}`),
                100
              );
              toast.success("Listing successfully added");
            })
            .catch((error) => {
              console.log(error);
              toast.error("Failed to add listing.");
            });
        }, "image/jpeg"); 
      }
    }
  };

  function validate() {
    let isValid = true;
    let errorsCopy = { ...errors };

    if (title != "") {
      errorsCopy.title = "";
    } else {
      errorsCopy.title = "Field is required";
      isValid = false;
    }

    if (manufacturer != "") {
      errorsCopy.manufacturer = "";
    } else {
      errorsCopy.manufacturer = "Field is required";
      isValid = false;
    }

    if (model != "") {
      errorsCopy.model = "";
    } else {
      errorsCopy.model = "Field is required";
      isValid = false;
    }

    if (yearOfManufacture != "") {
      errorsCopy.yearOfManufacture = "";
    } else {
      errorsCopy.yearOfManufacture = "Field is required";
      isValid = false;
    }

    if (engineSize != "") {
      errorsCopy.engineSize = "";
    } else {
      errorsCopy.engineSize = "Field is required";
      isValid = false;
    }

    if (kw != "") {
      errorsCopy.kw = "";
    } else {
      errorsCopy.kw = "Field is required";
      isValid = false;
    }

    if (distanceTraveled != "") {
      errorsCopy.distanceTraveled = "";
    } else {
      errorsCopy.distanceTraveled = "Field is required";
      isValid = false;
    }

    if (fuelType != "") {
      errorsCopy.fuelType = "";
    } else {
      errorsCopy.fuelType = "Field is required";
      isValid = false;
    }

    if (city != "") {
      errorsCopy.city = "";
    } else {
      errorsCopy.city = "Field is required";
      isValid = false;
    }

    if (price != "") {
      errorsCopy.price = "";
    } else {
      errorsCopy.price = "Field is required";
      isValid = false;
    }

    if (description != "") {
      errorsCopy.description = "";
    } else {
      errorsCopy.description = "Field is required";
      isValid = false;
    }

    if (file) {
      errorsCopy.file = "";
    } else {
      errorsCopy.file = "Field is required";
      isValid = false;
    }

    setErrors(errorsCopy);
    return isValid;
  }

  return (
    <>
      <button
        className="btn btn-outline-dark mt-auto"
        onClick={() => handleShow(true)}
      >
        Add New Listing
      </button>

      <Modal size="lg" show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add Listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={errors.title ? "is-invalid" : ""}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Manufacturer</Form.Label>
                  <Form.Select
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    className={errors.manufacturer ? "is-invalid" : ""}
                  >
                    <option></option>
                    {manufacturers.map((man, index) => (
                      <option key={index}>{man}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.manufacturer}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className={errors.model ? "is-invalid" : ""}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.model}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="number"
                    value={yearOfManufacture}
                    onChange={(e) => {
                      setYearOfManufacture(e.target.value);
                    }}
                    className={errors.yearOfManufacture ? "is-invalid" : ""}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.yearOfManufacture}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Engine Size</Form.Label>
                  <Form.Control
                    type="number"
                    value={engineSize}
                    onChange={(e) => setEngineSize(e.target.value)}
                    className={errors.engineSize ? "is-invalid" : ""}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.engineSize}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>kW</Form.Label>
                  <Form.Control
                    type="number"
                    value={kw}
                    onChange={(e) => setKw(e.target.value)}
                    className={errors.kw ? "is-invalid" : ""}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.kw}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Kilometraza</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="km"
                    value={distanceTraveled}
                    onChange={(e) => setDistanceTraveled(e.target.value)}
                    className={errors.distanceTraveled ? "is-invalid" : ""}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.distanceTraveled}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Fuel Type</Form.Label>
                    <Form.Select
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value)}
                      className={errors.fuelType ? "is-invalid" : ""}
                    >
                      <option></option>
                      <option>Benzin</option>
                      <option>Dizel</option>
                      <option>Plin</option>
                      <option>Struja</option>
                      <option>Hibrid</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.fuelType}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={errors.city ? "is-invalid" : ""}
                    >
                      <option></option>
                      {cities.map((cit, index) => (
                        <option key={index}>{cit}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.city}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={errors.price ? "is-invalid" : ""}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={errors.description ? "is-invalid" : ""}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Thumbnail Picture</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange} //onChange={(e) => setFile(e.target.files[0])}
                className={errors.file ? "is-invalid" : ""}
              />
              <Form.Control.Feedback type="invalid">
                {errors.file}
              </Form.Control.Feedback>
            </Form.Group>
            {file && (
              <div
                className="position-relative overflow-hidden"
                style={{ height: "300px" }}
              >
                <Cropper
                  src={file}
                  aspectRatio={3 / 2}
                  guides={true}
                  ref={cropperRef}
                  viewMode={1}
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddListing}>
            Add Listing
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddVehicleModal;

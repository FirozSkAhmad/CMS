import "./CaseStudyUpload.css";
import { useState, useRef, useContext } from "react";
import { storage, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import Loader from "./Loader";
import sharedContext from "../context/SharedContext";
import menuIcon from "../../utils/menu.svg";
import SideNav from "./SideNav";
import toast from "react-hot-toast";

const CaseStudyUpload = () => {
  const navigate = useNavigate();
  const { setLoader, isSideNavOpen, setIsSideNavOpen } =
    useContext(sharedContext);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const [formData, setFormData] = useState({
    name: "",
    clientName: "",
    context: "",
    technicalInformation: "",
    detailsOfWrk: "",
    results: "",
    img: null,
  });

  const [error, setError] = useState("");

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setFormData((preState) => {
      return {
        ...preState,
        [name]: value,
      };
    });
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const types = ["image/png", "image/jpeg"]; // image types

  const imgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setFormData((prevState) => ({
        ...prevState,
        img: selectedFile,
      }));
      setError("");
    } else {
      setFormData((prevState) => ({
        ...prevState,
        img: null,
      }));
      setError("Please select a valid image type (jpg or png)");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      // Upload the image to Firebase Storage
      const storageRef = ref(storage, `images/${formData.img.name}`);
      await uploadBytes(storageRef, formData.img);

      // Get the download URL of the uploaded image
      const imgUrl = await getDownloadURL(storageRef);

      formData.img = imgUrl;
      formData.uploadDate = new Date().toISOString();

      // Store data in Firestore
      await addDoc(collection(db, "Case Studies"), formData);

      toast.success("uploaded data Successfully");

      setFormData({
        name: "",
        clientName: "",
        context: "",
        technicalInformation: "",
        detailsOfWrk: "",
        results: "",
        img: null,
      }); // Clear form fields and error state after successful upload

      navigate("/caseStudies");
      setError("");
    } catch (error) {
      setLoader(false);
      toast.error(error.message);
      setError(error.message);
    }
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="csUpload_con">
      <Loader />
      <div className="csContent">
        <div className="csHeading_container">
          <div className="menu_con">
            <img
              className="menu_icon"
              onClick={toggleSideNav}
              src={menuIcon}
              alt="menuIcon SVG"
            />
          </div>
          <p className="csHeading">Case Study - Upload</p>
        </div>
        <div className="uploadBtn_con">
          <button className="changeBtn" onClick={handleBack}>
            Back
          </button>
          <button className="uploadBtn" onClick={handleUpload}>
            Upload
          </button>
        </div>
        <div className="csMain_con">
          <div className="csLeft_con">
            <div className="input_field">
              <label htmlFor="name">Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={onChangeInput}
                placeholder="Title Name"
                autoComplete="off"
              />
            </div>
            <div className="contextInput_field">
              <label htmlFor="context">Context</label>
              <textarea
                id="context"
                name="context"
                value={formData.context}
                onChange={onChangeInput}
                placeholder="Text here"
                autoComplete="off"
                style={{ height: "300px" }}
              ></textarea>
            </div>
            <div className="input_field">
              <label htmlFor="technicalInformation">
                Technical information
              </label>
              <textarea
                id="technicalInformation"
                name="technicalInformation"
                value={formData.technicalInformation}
                onChange={onChangeInput}
                placeholder="Text here"
                autoComplete="off"
                style={{ height: "300px" }}
              ></textarea>
            </div>
          </div>
          <div className="csRight_con">
            <div className="input_field">
              <label htmlFor="clientName">Client Name*</label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={onChangeInput}
                placeholder="Client Name"
                autoComplete="off"
              />
            </div>
            <div className="imgUpload_field">
              <p>Image Upload*</p>
              <div className="buttons_con">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={imgHandler}
                  style={{ display: "none" }}
                />
                <button
                  className="uploadBtn"
                  onClick={handleButtonClick}
                  disabled={formData.img ? true : false}
                >
                  Upload
                </button>
                <button
                  className="changeBtn"
                  onClick={handleButtonClick}
                  disabled={!formData.img}
                >
                  Change Image
                </button>
              </div>
            </div>
            <div className="imgPreview_field">
              {formData.img ? (
                <img
                  src={URL.createObjectURL(formData.img)}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "fill",
                    borderRadius: "10px",
                  }}
                  alt="Preview"
                />
              ) : (
                <p>Image Preview</p>
              )}
            </div>
            <div className="rightTextFields_con">
              <div className="input_field">
                <label htmlFor="detailsOfWrk">Details of the work</label>
                <textarea
                  id="detailsOfWrk"
                  name="detailsOfWrk"
                  value={formData.detailsOfWrk}
                  onChange={onChangeInput}
                  placeholder="Text here"
                  autoComplete="off"
                  style={{ height: "300px" }}
                ></textarea>
              </div>
              <div className="input_field">
                <label htmlFor="results">Results</label>
                <textarea
                  id="results"
                  name="results"
                  value={formData.results}
                  onChange={onChangeInput}
                  placeholder="Text here"
                  autoComplete="off"
                  style={{ height: "300px" }}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`side_nav ${isSideNavOpen ? "open" : ""}`}>
        <SideNav />
      </div>
    </div>
  );
};

export default CaseStudyUpload;

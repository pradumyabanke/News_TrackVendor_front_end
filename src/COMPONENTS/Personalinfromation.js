import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "../CSS/Personalinformation.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Navbar from "./Navbar";
import axios from "axios";

const Personalinfromation = () => {
  const [step, setStep] = useState(1);

  const goToNextStep = () => {
    setStep(step + 1);
  };

  const goToPreviousStep = () => {
    setStep(step - 1);
  };

  const initialValues = {
    user_name: "",
    first_name: "",
    last_name: "",
    user_role: "",
    byline: "",
    password: "",
    middle_name: "",
    department: "",
    user_superior: "",
    display_name: "",
    mobile_1: 0,
    mobile_2: 0,
    address: "",
    pin_code: 0,
    email_1: "",
    email_2: "",
    city: "",
    state: "",
    user_image: "",
    social_facebook: "",
    social_linkedin: "",
    user_BIO: "",
    social_twitter: "",
    social_instagram: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://174.138.101.222:8080/user-role",
        values
      );
      alert(response.statusText);
      // navigate("/dashboard");
      // setEmail("");
      // setPassword("");
    } catch (error) {
      alert(error.request.responseText);
    }
  };

  console.log(values);

  // Render different form screens based on the current step
  const renderFormScreen = () => {
    switch (step) {
      case 1:
        return (
          <div className="personalcontainer">
            <p className="personaltext">LOGIN & NAME</p>
            <div className="formbox">
              <div className="formbox1">
                <TextField
                  id="standard-basic"
                  label="USER NAME *"
                  name="user_name"
                  value={values.user_name}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="FIRST NAME *"
                  name="first_name"
                  value={values.first_name}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="LAST NAME *"
                  name="last_name"
                  value={values.last_name}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="USER ROLE *"
                  name="user_role"
                  value={values.user_role}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="SHOW HIS NAME (BYLINE) *"
                  name="byline"
                  value={values.byline}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
              </div>
              <div className="formbox1">
                <TextField
                  id="standard-basic"
                  label="PASSWORD *"
                  name="password"
                  value={values.password}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="MIDDLE NAME *"
                  name="middle_name"
                  value={values.middle_name}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="DEPARTMENT *"
                  name="department"
                  value={values.department}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="USER SUPERIOR *"
                  name="user_superior"
                  value={values.user_superior}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="DISPLAY NAME *"
                  name="display_name"
                  value={values.display_name}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <button className=" btn  personalbtn" onClick={goToNextStep}>
                  Next
                </button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="personalcontainer">
            <p className="personaltext">CONTACT DETAILS</p>
            <div className="formbox">
              <div className="formbox1">
                <TextField
                  id="standard-basic"
                  label="MOBILE 1 *"
                  name="mobile_1"
                  value={values.mobile_1}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="MOBILE 2 *"
                  name="mobile_2"
                  value={values.mobile_2}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="RESIDENCE ADDRESS*"
                  name="address"
                  value={values.address}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="PIN CODE *"
                  name="pin_code"
                  value={values.pin_code}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <button className="btn previousbtn" onClick={goToPreviousStep}>
                  Previous
                </button>
              </div>
              <div className="formbox1">
                <TextField
                  id="standard-basic"
                  label="EMAIL 1 *"
                  name="email_1"
                  value={values.email_1}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="EMAIL 2 *"
                  name="email_2"
                  value={values.email_2}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label=" CITY *"
                  name="city"
                  value={values.city}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="STATE *"
                  name="state"
                  value={values.state}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />

                <button className="btn personalbtn" onClick={goToNextStep}>
                  Next
                </button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="personalcontainer">
            <p className="personaltext">SOCIAL & BIO</p>
            <div className="formbox">
              <div className="formbox1">
                <TextField
                  id="standard-basic"
                  label="USER IMAGE *"
                  name="user_image"
                  value={values.user_image}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="USER SOCIAL FB *"
                  name="social_facebook"
                  value={values.social_facebook}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="USER SOCIAL LINKDIN   *"
                  name="social_linkedin"
                  value={values.social_linkedin}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <button className="btn previousbtn" onClick={goToPreviousStep}>
                  Previous
                </button>
              </div>
              <div className="formbox1">
                <TextField
                  id="standard-basic"
                  label="USER BIO *"
                  name="user_BIO"
                  value={values.user_BIO}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="USER SOCIAL TWITTER*"
                  name="social_twitter"
                  value={values.social_twitter}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="USER SOCIAL INSTA *"
                  name="social_instagram"
                  value={values.social_instagram}
                  onChange={handleInputChange}
                  variant="standard"
                  className="personalinput"
                />
                <button className="btn personalbtn" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="rolebasedcontainer">
        <div className="rolebasedbox1">
          <Navbar />
        </div>
        <div className="rolebasedbox2">
          <div className="rolebasedheader">
            <p className="rolebasedheading">
              <ArrowBackIcon /> ROLE BASED USER
            </p>
          </div>
          <div className="col-sm-12 buttongroup">
            <button
              onClick={() => setStep(1)}
              class="btn rolebtn"
              type="submit"
            >
              LOGIN & NAME
            </button>
            <button
              onClick={() => setStep(2)}
              class="btn  rolebtn"
              type="submit"
            >
              CONTACT DETAILS
            </button>
            <button
              onClick={() => setStep(3)}
              class="btn  rolebtn"
              type="submit"
            >
              SOCIAL & BIO
            </button>
          </div>
          <form onSubmit={handleSubmit}>{renderFormScreen()}</form>
        </div>
      </div>
    </>
  );
};

export default Personalinfromation;

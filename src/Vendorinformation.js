import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const Vendorinfromation = () => {
  const [step, setStep] = useState(1);

  const goToNextStep = () => {
    setStep(step + 1);
  };

  const goToPreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

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
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="FIRST NAME *"
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="LAST NAME *"
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="USER ROLE *"
                  variant="standard"
                  className="personalinput"
                />
                    <TextField
                  id="standard-basic"
                  label="SHOW HIS NAME (BYLINE) *"
                  variant="standard"
                  className="personalinput"
                />
                           </div>
              <div className="formbox1">
                <TextField
                  id="standard-basic"
                  label="PASSWORD *"
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="MIDDLE NAME *"
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="DEPARTMENT *"
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="USER SUPERIOR *"
                  variant="standard"
                  className="personalinput"
                />
                  <TextField
                  id="standard-basic"
                  label="DISPLAY NAME *"
                  variant="standard"
                  className="personalinput"
                />
                <button  className=" btn btn-info personalbtn" onClick={goToNextStep}>Next</button>
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
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="MOBILE 2 *"
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="RESIDENCE ADDRESS*"
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="PIN CODE *"
                  variant="standard"
                  className="personalinput"
                />
              </div>
              <div className="formbox1">
                <TextField
                  id="standard-basic"
                  label="EMAIL 1 *"
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="EMAIL 2 *"
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label=" CITY *"
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="STATE *"
                  variant="standard"
                  className="personalinput"
                />
                <button  className="btn btn-info personalbtn" onClick={goToPreviousStep}>Previous</button>
                <button  className="btn btn-info personalbtn" onClick={goToNextStep}>Next</button>
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
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="USER SOCIAL FB *"
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="USER SOCIAL LINKDIN   *"
                  variant="standard"
                  className="personalinput"
                />
               
              </div>
              <div className="formbox1">
                <TextField
                  id="standard-basic"
                  label="USER BIO *"
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="USER SOCIAL TW *"
                  variant="standard"
                  className="personalinput"
                />
                <TextField
                  id="standard-basic"
                  label="USER SOCIAL INSTA *"
                  variant="standard"
                  className="personalinput"
                />
            
                <button  className="btn btn-info personalbtn" onClick={goToPreviousStep}>Previous</button>
                <button className="btn btn-info personalbtn" type="submit">Submit</button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (

    <form onSubmit={handleSubmit}>{renderFormScreen()}</form>

  );
};

export default Vendorinfromation;


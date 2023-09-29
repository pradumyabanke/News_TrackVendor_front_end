import React, { useEffect, useState } from "react";
import "../CSS/Addnewsarticle.module.scss";
import Navbar from "./Navbar";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const Profile = () => {
  const finalValues = {
    publisher_name: "",
    type_of_Entity: "",
    password: "",
    owner_key: "",
    publisher_BIO: "",
    account_manager: "",
    mobile: "",
    email: "",

    tech_name: "",
    tech_mobile: "",
    tech_email: "",

    finance_name: "",
    finance_mobile: "",
    finance_email: "",

    sales_name: "",
    sales_mobile: "",
    sales_email: "",

    editorial_name: "",
    editorial_mobile: "",
    editorial_email: "",

    regd_address: "",
    regd_state_city: "",
    regd_pin_code: "",

    comm_address: "",
    comm_state_city: "",
    comm_pin_code: "",
    publication_name: "",
    Lang_of_Publication: "",
    city_of_publication: "",
    frequency_of_publication: "",
    circulation: "",
    RNI_No: "",
    RNI_Regn_date: "",
    pub_social_facebook: "",
    pub_social_twitter: "",
    pub_social_linkedin: "",
    pub_social_instagram: "",
    pub_social_youtube: "",

    publisher_site_mobile: "",
    publisher_site_email: "",
    domain_name: "",
    logo_large: "",
    logo_small: "",
    site_display_contact: "",

    PAN_No: "",
    GST_No: "",
    Bank_acc_No: "",
    Bank_name: "",
    Branch_name: "",
    IFSC_code: "",
    status_user: "",
    status_publication: "",
    Revenue_Share: "",
    Agreement_Start_Date: "",
    Agreement_End_Date: "",
    Auto_Renewal: "",
    Refferal_by: "",
  };
  const [agencyDetails, setAgencyDetails] = useState();

  const id = localStorage.getItem("newspaperAgencyAdminId");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://174.138.101.222:8080/${id}/get-publication-details`
      );
      setAgencyDetails(response.data.data[0]);

      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateData = async () => {
    let formdata = new FormData();
    for (const key in agencyDetails) {
      if (agencyDetails.hasOwnProperty(key)) {
        formdata.append(key, agencyDetails[key]);
      }
    }
    try {
      const response = await axios.put(
        `http://174.138.101.222:8080/${id}/update-publication`,
        formdata,
        {
          Headers: {
            "Content-Type": "multipart/form",
          },
        }
      );
      //   console.log(formdata);
      alert("Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file") {
      setAgencyDetails({
        ...agencyDetails,
        [name]: e.target.files[0],
      });
    } else {
      setAgencyDetails({
        ...agencyDetails,
        [name]: value,
      });
    }
  };

  const [style, setStyle] = useState("navbarbox");

  const changeStyle = () => {
    setStyle((prev) => {
      if (prev === 'navbarbox') {
        setStyle('navbarbox2')
      } else setStyle('navbarbox')
    });
  };


  return (
    <>
      <div className={style}>
          <Navbar />
        </div>
      <div className="parentContainer">
        <h1 className="bg-red">
          <div className="dashwithfav">
            <span>
              <HiOutlineArrowSmallLeft className="rightShift"/>
            UPDATE PROFILE</span>
            <div className="onclick" onClick={changeStyle}>
              <i class="fa-solid fa-bars"></i>
            </div>
          </div>
        </h1>





        {agencyDetails && (
          <div className="container-fluid">
            <div className="row  gx-2 gy-3">
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="Publication Name"
                  variant="outlined"
                  name="publication_name"
                  value={agencyDetails.publication_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="Registered Mobile"
                  variant="outlined"
                  fullWidth
                  name="mobile"
                  value={agencyDetails.mobile}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="Registered Email"
                  fullWidth
                  type="email"
                  variant="outlined"
                  name="email"
                  value={agencyDetails.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  name="password"
                  value={agencyDetails.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="Bank Name"
                  variant="outlined"
                  fullWidth
                  name="Bank_name"
                  value={agencyDetails.Bank_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="Bank Account No."
                  variant="outlined"
                  fullWidth
                  name="Bank_acc_No"
                  value={agencyDetails.Bank_acc_No}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="Branch Name"
                  variant="outlined"
                  fullWidth
                  name="Branch_name"
                  value={agencyDetails.Branch_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="IFSC Code"
                  variant="outlined"
                  name="IFSC_code"
                  value={agencyDetails.IFSC_code}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3 col-md-6">
                <label htmlFor="logo_small" className="form-label">
                  Logo Small
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="logo_small"
                  name="logo_small"
                  //   value={agencyDetails.logo_small}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="formFile" className="form-label">
                  Logo Large
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  name="logo_large"
                  //   value={agencyDetails.logo_large}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        )}

        <Button
          variant="contained"
          className="FormControl bg-red"
          onClick={() => {
            updateData();
          }}
        >
          Update Profile
        </Button>
      </div>
    </>
  );
};

export default Profile;

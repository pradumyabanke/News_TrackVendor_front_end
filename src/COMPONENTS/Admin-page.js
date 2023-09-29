import React, { useState } from "react";
import "../CSS/Admin-page.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://174.138.101.222:8080/adminLogin",
        {
          email: email,
          password: password,
        }
      );
      // console.log(response.data.data._id, response.data.data.token);
      localStorage.setItem("superAdminId", response.data.data._id);
      localStorage.setItem("superAdminToken", response.data.data.token);

      navigate("/dashboard");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="admin-pagecontainer">
        <div className="adminimagediv">
          <img className="adminpageimage" src="\images\phot new.jpg"></img>
        </div>

        <div className="adminformdiv">
          <div>
            {" "}
            <p className="adminlogin">Admin Login</p>
            <div className="hrrow">
              <hr className="hr1" />
              <p className="or"> or </p>
              <hr className="hr1" />
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="adminlabel">Email *</label>
                <input
                  onChange={handleEmailInput}
                  value={email}
                  type="email"
                  name="mail"
                  placeholder="ram123@gmail.com"
                  className="form-control admininput"
                />
              </div>
              <div className="form-group">
                <label className="adminlabel">Password *</label>
                <input
                  onChange={handlePasswordInput}
                  value={password}
                  type="password"
                  name="mail"
                  placeholder="min 8 characters"
                  className="form-control admininput"
                />
              </div>
              <div className="form-group">
                <button className="form-control adminloginbtn">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;

import React, { useState } from "react";
import "../CSS/ViewNews.scss";
import Navbar from "./Navbar";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";


const TemplateSelection = () => {
  const navigate = useNavigate();

  //   const item = newsData?.state.item;
  // console.log(item);

  const [style, setStyle] = useState("navbarbox");

  const changeStyle = () => {
    setStyle((prev) => {
      if (prev === 'navbarbox') {
        setStyle('navbarbox2')
      } else setStyle('navbarbox')
    });
  }

  return (
    <>
      <div className={style}>
        <Navbar />
      </div>
      <div className="parentContainer">
        <h1 className="bg-red">
        <div className="dashwithfav">
          <span onClick={() => navigate(-1)} className="pointer rightShift">
            <HiOutlineArrowSmallLeft className="rightShift"/> 
          
          Template Selection</span>
          <div className="onclick" onClick={changeStyle}>
              <i class="fa-solid fa-bars"></i>
            </div>
          </div>
        </h1>
        <h5 className="px-3">
          To use any of the available Template in your website , just simply
          update the record in your domain DNS configuration with the url
          provided in the Template below.
        </h5>
        <div className="d-flex px-3">
          <div className="card " style={{ width: "30rem" }}>
            <img
              className="card-img-top"
              src={require("../Images/Screenshot (5).png")}
              alt="Card image cap"
              width={"100%"}
              height={"200px"}
            />
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-center font-weight-bold">
                Template 1
              </h5>
              <a className="card-text">
                {`http://174.138.101.222:7000/${localStorage.getItem(
                  "newspaperAgencyAdminId"
                )}`}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateSelection;

import React, { useState } from "react";
import "../CSS/ViewNews.scss";
import Navbar from "./Navbar";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";


const ViewNews = () => {
  const newsData = useLocation();
  const navigate = useNavigate();

  const item = newsData?.state.item;
  // console.log(item);

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

            <span onClick={() => navigate(-1)} className="pointer rightShift">
              <HiOutlineArrowSmallLeft className="rightShift"/> 
              View News
            </span>
            

            <div className="onclick" onClick={changeStyle}>
              <i class="fa-solid fa-bars">hh</i>
            </div>
          </div>
        </h1>
        <div className="metaDataContainer1">
          <div className="metaDataContainer1__data">
            <p className="key">ID</p>
            <p className="value">{item._id}</p>
          </div>
          <div className="metaDataContainer1__data">
            <p className="key">Platform</p>
            <p className="value">Mobile</p>
          </div>
          <div className="metaDataContainer1__data">
            <p className="key">Category</p>
            <p className="value">{item.category}</p>
          </div>
          <div className="metaDataContainer1__data">
            <p className="key">Sub-Categories</p>
            <p className="value">Mining & Resources</p>
          </div>
          <div className="metaDataContainer1__data">
            <p className="key">Language</p>
            <p className="value">English</p>
          </div>
        </div>
        <div className="articleContainer">
          <h5 className="articleContainer__titleHeading">News title</h5>
          <p
            className="articleContainer__titleContent"
            dangerouslySetInnerHTML={{ __html: item.title }}
          ></p>
          {item.image.includes("http://174.138.101.222") ? (
            <img src={item.image} style={{ maxWidth: "100%" }} />
          ) : (
            <img
              style={{ maxWidth: "100%" }}
              src={`http://174.138.101.222:8080` + item.image}
            />
          )}

          <h5 className="articleContainer__titleHeading">Summary</h5>
          <p
            className="articleContainer__titleContent"
            dangerouslySetInnerHTML={{ __html: item.short_details }}
          ></p>

          <h5 className="articleContainer__titleHeading">Description</h5>
          <p
            className="articleContainer__titleContent"
            style={{ fontFamily: "bhaskar" }}
            dangerouslySetInnerHTML={{ __html: item.body }}
          ></p>
        </div>
        <div className="metaDataContainer1 marginBottom">
          <div className="metaDataContainer1__data">
            <p className="key">Newspaper Agency</p>
            <p className="value">Dainik Bhaskar</p>
          </div>
          <div className="metaDataContainer1__data">
            <p className="key">Published From</p>
            <p className="value">Indore</p>
          </div>
          <div className="metaDataContainer1__data">
            <p className="key">Status</p>
            <p className="value">Approved</p>
          </div>
          <div className="metaDataContainer1__data">
            <p className="key">Expiry Date</p>
            <p className="value">30/04/23</p>
          </div>
          <div className="metaDataContainer1__data">
            <p className="key">Language</p>
            <p className="value">English</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewNews;

import React, { useEffect, useState } from "react";
import "../CSS/Maindashboard.css";
import Navbar from "./Navbar";
import "../CSS/CreateAd.css";

import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";

const CreateAd = () => {
  let initialValue = {
    page_name: "",
    page_location: "",
    desktop: "",
    start_date: "",
    end_date: "",
    image: "",
    script: "",
    text: "",
  };
  const [values, setValues] = useState(initialValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setValues((prev) => {
        return { ...prev, "image": e.target.files[0] };
      });
    } else {
      setValues((prev) => {
        return { ...prev, [name]: value };
      });
    }

  };

  const id = localStorage?.getItem("newspaperAgencyAdminId");

  const [adPermission, setAdPermission] = useState();
  const getAdvPermission = async ()=>{
    
    try {
      const response = await axios.get(`http://174.138.101.222:8080/${id}/getvendorPageNameLocations`)
      // console.log(response.data.data[0])
      setAdPermission(response.data.data[0])
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getAdvPermission()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    for (let key in values) {
      formdata.append(key, values[key]);
    }
    try {
      const response = await axios.post(
        `http://174.138.101.222:8080/${id}/create-advertisement`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/formdata",
          },
        }
      );
      console.log(response);
      setValues(initialValue)
      alert('Ad Created')
    } catch (error) {
      console.log(error);
      alert(error.message)
    }
  };


  const navigate = useNavigate();

  const [style, setStyle] = useState("navbarbox");

  const changeStyle = () => {
    setStyle((prev) => {
      if (prev === 'navbarbox') {
        setStyle('navbarbox2')
      } else setStyle('navbarbox')
    });
  }



  return (
    <div className="maindashboard">
      <div className={style}>
        <Navbar />
      </div>
      <div className="dashbox position-relative ">
        <div className="dashwithfav">

          <span className="my-auto" style={{ fontSize: '1.3rem', fontWeight: '400' }} onClick={() => navigate(-1)} >
            <HiOutlineArrowSmallLeft className="rightShift" style={{ marginRight: "16px" }} />
            Create Advertisement </span>

          <div className="onclick" onClick={changeStyle}>
            <i className="fa-solid fa-bars"></i>
          </div>

        </div>
        <h4 style={{ fontFamily: "initial", marginTop: '11px', marginLeft: '18px' }}>

          Select Type of Ad
        </h4>
        <br />
        <FormControl sx={{ width: "95%", position: 'relative', left: '50%', transform: 'translateX(-50%)' }} className=" mb-4">
          <InputLabel>Page Name</InputLabel>
          <Select
            label="Page Name"
            name="page_name"
            value={values.page_name}
            onChange={handleInputChange}
          > {
            adPermission && adPermission.page_name.map((item, index)=>{
                return <MenuItem key={index} value={item}>{item}</MenuItem>
            }) 
          }
          </Select>
        </FormControl>
        <br />

        <FormControl sx={{ width: "95%", position: 'relative', left: '50%', transform: 'translateX(-50%)' }} className=" mb-4">
          <InputLabel>Page Location</InputLabel>
          <Select
            name="page_location"
            label="Page Location"
            value={values.page_location}
            onChange={handleInputChange}
          >
            {
            adPermission && adPermission.page_location.map((item, index)=>{
                return <MenuItem key={index} value={item}>{item}</MenuItem>
            }) 
          }
          </Select>
        </FormControl>
        <br />
        <FormControl sx={{ width: "95%", position: 'relative', left: '50%', transform: 'translateX(-50%)' }} className=" mb-4">
          <InputLabel>Platform</InputLabel>
          <Select
            label="Platform"
            name="desktop"

            value={values.desktop}
            onChange={handleInputChange}
          >
            <MenuItem value={"Desktop"}>Desktop</MenuItem>
            <MenuItem value={"Mobile"}>Mobile</MenuItem>
            <MenuItem value={"Both"}>Both</MenuItem>
          </Select>
        </FormControl>
        <br />
        <h6 className="ms-3 mb-2" style={{ fontFamily: "initial" }}>
          Start Date:-
        </h6>{" "}
        <TextField
          sx={{ width: "95%", position: 'relative', left: '50%', transform: 'translateX(-50%)' }}
          className="mb-4"
          name="start_date"
          value={values.start_date}
          onChange={handleInputChange}
          type="datetime-local"
        ></TextField>
        <br />
        <h6 className="ms-3 mb-2" style={{ fontFamily: "initial" }}>
          End Date:-
        </h6>
        <TextField
          sx={{ width: "95%", position: 'relative', left: '50%', transform: 'translateX(-50%)' }}
          name="end_date"
          value={values.end_date}
          onChange={handleInputChange}
          className=" mb-4"
          type="datetime-local"
        ></TextField>
        <br />
        <FormControl className="mx-3 mb-4">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            row
            onChange={(e) =>
              setValues({ ...values, type_of_ad: e.target.value })
            }
          >
            <FormControlLabel value="Image" control={<Radio />} label="Image" />
            <FormControlLabel
              value="Script"
              control={<Radio />}
              label="Script"
            />
            <FormControlLabel value="Text" control={<Radio />} label="Text" />
          </RadioGroup>
        </FormControl>
        {values.type_of_ad === "Image" && (
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="file"
            className="mx-2"
            sx={{ width: "400px" }}
            hiddenLabel="Image"
            // value={values.image}
            name="image"
            onChange={handleInputChange}
          />
        )}
        {values.type_of_ad === "Script" && (
          <TextField
            id="outlined-basic"
            className="mx-2 mb-4"
            multiline
            label="Script"
            variant="outlined"
            sx={{ width: "400px" }}
            name="script"
            value={values.script}
            onChange={handleInputChange}
          />
        )}
        {values.type_of_ad === "Text" && (
          <TextField
            id="outlined-basic"
            className="mx-2 mb-4"
            multiline
            label="Text"
            variant="outlined"
            sx={{ width: "400px" }}
            name="text"
            value={values.text}
            onChange={handleInputChange}
          />
        )}
        <br />
        <Button
          className="mb-4"
          style={{ backgroundColor: "red", position: 'absolute', left: '50%',bottom:'-70px', transform: 'translateX(-50%)', width: '200px', height: '45px' }}
          variant="contained"
        
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Create Ad
        </Button>
      </div>
    </div >
  );
};

export default CreateAd;

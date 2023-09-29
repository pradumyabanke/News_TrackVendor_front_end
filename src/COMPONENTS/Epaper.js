import React, { useEffect, useState } from "react";
import "../CSS/Epaper.scss";
import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Backdrop, CircularProgress } from "@mui/material";

const Epaper = () => {
  const navigate = useNavigate();

  const [age, setAge] = useState();
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [pdf, setPdf] = useState();
  const [size, setSize] = useState({});

  const [loader, setLoader] = useState(false);

  const fetchPageSize = async (e) => {
    setLoader(true);
    let formdata = new FormData();
    formdata.append("pdf", pdf);
    try {
      const response = await axios.post(
        "http://174.138.101.222:5000/api/coordinate",
        formdata,
        {
          headers: {
            "Content-type": "multipart/form-date",
          },
        }
      );

      response.data.coordinates.forEach((item, index) => {
        setSize((prevSize) => ({
          ...prevSize,
          [index]: item[1],
        }));
      });
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
      alert("Error Occured");
    }
  };

  const [agencyDetails, setAgencyDetails] = useState();

  const id = localStorage.getItem("newspaperAgencyAdminId");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://174.138.101.222:8080/${id}/get-publication-details`
      );
      setAgencyDetails(response.data.data[0]);

      console.log(response.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (Object.keys(size).length > 0) {
      navigate("/EpaperPreview", {
        state: {
          pdf: pdf,
          sizes: size,
        },
      });
    }
    fetchData();
  }, [size, navigate, pdf]);

  const [singlePdf, setSinglePdf] = useState("Upload PDF");
  const [multiPdf, setMultiPdf] = useState("Upload PDF");

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
      <div className="Epapermaincontainer">
        <div className="epaperbox1">
          <div className={style}>
            <Navbar />
          </div>
        </div>

        <div className="epaperbox2">
          <div className="epaperheader">
            <div className="dashwithfav">
              <p className="epaperheading">
                {" "}
                <ArrowBackIcon onClick={() => navigate(-1)} className="pointer rightShift" />
                E-PAPER
              </p>
              <div className="onclick" onClick={changeStyle}>
                <i class="fa-solid fa-bars top"></i>
              </div>
            </div>
          </div>
          <Box
            component="div"
            sx={{
              mt: 8,
              
            }}
          >
            <Box
              component="grid"
              sx={{
                "& > :not(style)": { m: 3, width: "40ch" },
              }}
              noValidate
              autoComplete="off"
            >
              {/* <TextField id="outlined-basic" label="NAME" variant="outlined" /> */}
              {/* <TextField id="outlined-basic" label="STATE" variant="outlined" /> */}
              {/* <TextField id="outlined-basic" label="CITY" variant="outlined" /> */}
              {agencyDetails && (
                <>
                  {" "}
                  <TextField
                    id="outlined-basic"
                    // label="Publication Name"
                    value={agencyDetails.publication_name}
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-basic"
                    // label="Language of Publication"
                    value={agencyDetails.Lang_of_Publication}
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-basic"
                    // label="Language"
                    value={agencyDetails.circulation}
                    variant="outlined"
                  />
                </>
              )}
            </Box>
          </Box>
          {
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={loader}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          }
          <div className="bottom">
            <div className="inputpdf">
              <label htmlFor="inputSinglePdf" className="inputTaglabel">
                {singlePdf} <PictureAsPdfIcon className="pdficon" />
                <p className="pdftext">SINGLE PAGE PDF</p>
              </label>
              <input
                type="file"
                className="inputTag"
                id="inputSinglePdf"
                onChange={(e) => {
                  setPdf(e.target.files[0]);
                  setSinglePdf(e.target.files[0].name);
                  setSize({});
                }}
              />
            </div>

            <div className="inputpdf">
              <label htmlFor="inputMultiPdf" className="inputTaglabel">
                {multiPdf} <PictureAsPdfIcon className="pdficon" />
                <p className="pdftext">MULTIPLE PAGE PDF</p>
              </label>

              <input
                type="file"
                className="inputTag"
                id="inputMultiPdf"
                onChange={(e) => {
                  setPdf(e.target.files[0]);
                  setMultiPdf(e.target.files[0].name);
                  setSize({});
                }}
              />
            </div>
          </div>
          <div className="centre">
          <button
            className="btn btn-primary btn-lg epaperbtn bg-red"
            onClick={() => fetchPageSize()}
          >
            Preview
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Epaper;

import React, { useEffect, useRef, useState } from "react";
import "../CSS/EpaperPreview.scss";
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const EpaperPreview = () => {
  const location = useLocation();
  // console.log(location);
  const data = location.state?.pdf;

  const [viewPdf, setViewPdf] = useState(null);
  const page = useRef(0);
  const orgHeight = location.state.sizes[0];
  // console.log(orgHeight, "height");
  const [myHeight, setMyHeight] = useState(0);
  const zoom = useRef(0);
  const [button, setButton] = useState(false);

  const extractFontFamilyName = (fontName) => {
    if (fontName == "Wingdings-Regular") {
      return "Bhaskar";
    }
    const pattern = /^([^\d-]+)/;
    const match = fontName.match(pattern);
    // console.log(match);

    if (match) {
      return match[1];
    } else {
      return "";
    }
  };

  {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = (e) => {
      setViewPdf(e.target.result);
    };
  }

  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const handlePageChange = (e: PageChangeEvent) => {
    // console.log("Page no.", e.currentPage);
    page.current = e.currentPage;
  };

  const handleZoom = (e: ZoomEvent) => {
    console.log(`Zoom to ${e.scale}`);
    zoom.current = e.scale;
  };

  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    // console.log(`File Rendered Successfully`);
    var element = document.querySelector(".rpv-core__page-layer--single");
    var rect = element.getBoundingClientRect();
    // console.log(rect);
    setMyHeight(rect.height);

    zoom.current = rect.height / orgHeight;
    setOffsetX(rect.x);
    setOffsetY(0);
  };

  const startX = useRef(0);
  const startY = useRef(0);
  const endX = useRef(null);
  const endY = useRef(null);

  const scrollbar = useRef(0);

  const handleMouseDown = (event) => {
    const { clientX, clientY } = event;
    // console.log(event.target.offsetParent.offsetLeft);
    scrollbar.current =
      (document.querySelector(".pdf-container").offsetWidth -
        document.querySelector(".rpv-core__inner-page").offsetWidth) /
      2;
    console.log(scrollbar.current);
    setOffsetX(event.target.offsetParent.offsetLeft);
    if (button !== true) {
      endX.current = null;
      endY.current = null;
      startX.current = clientX;
      startY.current = clientY;
    } else return;
  };
  const [finalCo, setFinalCo] = useState({
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0,
  });

  const handleMouseUp = (event) => {
    const { clientX, clientY } = event;

    if (button === true) {
      return;
    }
    endX.current = clientX;
    endY.current = clientY;

    if (offsetY >= 0) {
      // console.log(offsetY);
      // console.log("x-y start", startX - offsetX, startY - offsetY);
      // console.log("x-y end", clientX - offsetX, clientY - offsetY);
      setFinalCo({
        minX: (startX.current - offsetX) / zoom.current,
        // minX: (startX.current - offsetX - scrollbar.current) / zoom.current,
        minY: (startY.current - offsetY) / zoom.current,
        maxX: (clientX - offsetX - scrollbar.current) / zoom.current,
        maxY: (clientY - offsetY) / zoom.current,
      });
      if (startX.current !== clientX && startY.current !== clientY) {
        setButton(true);
      }
    } else {
      return;
    }
  };
  const [extractedData, setExtractedData] = useState(null);
  const [body, setBody] = useState(null);
  const [image, setImage] = useState("");

  const fetchData = async (e) => {
    e.stopPropagation();
    setExtractedData(null);
    startX.current = null;
    startY.current = null;
    endX.current = null;
    endY.current = null;
    setButton(false);
    var formData = new FormData();
    console.log(finalCo);
    formData.append("pdf", data);
    try {
      const response = await axios.post(
        `http://174.138.101.222:5000/api/extractdata_withfont2?x_min=${Math.round(
          finalCo.minX
        )}&x_max=${Math.round(finalCo.maxX)}&y_min=${Math.round(
          finalCo.minY
        )}&y_max=${Math.round(finalCo.maxY)}&page_number=${page.current}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let resData = response.data.data;
      console.log(resData);
      let bodyString = "";
      // console.log(resData);
      for (let i = 0; i < resData.length; i++) {
        bodyString = bodyString + resData[i].paragraph + "\n";
        // console.log(bodyString);
      }
      setBody(bodyString);
      setExtractedData(response.data);
      setImage(`http://174.138.101.222:5000${response.data.image_url}`);
    } catch (error) {
      console.log(error);
      alert("Error Occured");
    }
  };
  // console.log(body);
  const getSelectionStyles = () => {
    if (startX.current && startY.current && endX.current && endY.current) {
      const left = Math.min(startX.current, endX.current);
      const top = Math.min(startY.current, endY.current);
      const width = Math.abs(startX.current - endX.current);
      const height = Math.abs(startY.current - endY.current);

      return {
        position: "absolute",
        left: left + "px",
        top: top + "px",
        width: width + "px",
        height: height + "px",
        border: "2px solid blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        pointerEvents: "none",
      };
    } else {
      return {};
    }
  };

  const [category, setCategory] = useState("");

  ///////////////////////////////// To send in Draft ///////////////////////////////////////

  const draftHandeler = () => {
    let formdata = new FormData();

    formdata.append("category", category);
    formdata.append("body", body);
    formdata.append("image", image);

    const newspaperAgencyAdminToken = localStorage?.getItem(
      "newspaperAgencyAdminToken"
    );
    const newspaperAgencyAdminId = localStorage?.getItem(
      "newspaperAgencyAdminId"
    );

    console.log(formdata);
    axios({
      method: "post",
      url: `http://174.138.101.222:8080/${newspaperAgencyAdminId}/draft-article`,
      data: formdata,
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + newspaperAgencyAdminToken,
      },
    })
      .then((response) => alert(response.data.message))
      .catch((error) => console.log(error));
  };
  ///////////////////////////////// To send draft request ///////////////////////////////////////

  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://174.138.101.222:8080/getmastercategories"
      );
      console.log(response.data.data, "categories");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="home-container">
      <div
        className="pdf-container"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
          {viewPdf && (
            <>
              <Viewer
                initialPage={0}
                fileUrl={viewPdf}
                defaultScale={SpecialZoomLevel.PageFit}
                onPageChange={handlePageChange}
                onZoom={handleZoom}
                onDocumentLoad={handleDocumentLoad}
              />
              {button && (
                <button
                  onClick={fetchData}
                  style={{ position: "absolute", top: "20%", right: "30%" }}
                >
                  Fetch Data
                </button>
              )}
            </>
          )}
        </Worker>
      </div>

      <div style={getSelectionStyles()}></div>

      <div className="preview-div">
        {extractedData ? (
          <>
            <FormControl fullWidth>
              <InputLabel id="category">Categories</InputLabel>
              <Select
                labelId="category"
                id="category"
                value={category}
                label="Categories"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                {categories.map((item, index) => {
                  return (
                    <MenuItem value={item.categories_Name_Url} key={index}>
                      {item.categories_Name_English} /{" "}
                      {item.categories_Name_Hindi}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {extractedData.data.map((data) => (
              <>
                <p
                  className="para"
                  style={{ fontFamily: extractFontFamilyName(data.font) }}
                >
                  {data.paragraph}
                </p>
              </>
            ))}
            <img
              src={`http://174.138.101.222:5000${extractedData.image_url}`}
            />
            <Button
              sx={{
                marginTop: "10px",
                width: "150px",
                position: "relative",
                left: "50%",
                transform: "translateX(-50%)",
              }}
              variant="contained"
              onClick={draftHandeler}
            >
              Send to Draft
            </Button>
          </>
        ) : (
          <CircularProgress className="circularProgress" color="inherit" />
        )}
      </div>
    </div>
  );
};

export default EpaperPreview;

import React, { useState } from "react";
import styles from "../CSS/EditArticle.module.scss";
import Navbar from "./Navbar";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import categories from "../Masters/Categories";

const EditArticle = () => {
  const location = useLocation();
  // console.log(location.state);

  const navigate = useNavigate();

  ///////////////////////////////// To take user input ///////////////////////////////////////

  let initialValues = {
    _id: location?.state._id,
    category: location?.state.category,
    title: location?.state.title,
    sub_heading: "Sub Heading",
    short_details: location?.state.short_details,
    body: location?.state.body,
    image: location?.state.image,
    url: location?.state.url,
    tags: location?.state.tags,
    news_priority: location?.state.news_priority,
    news_sections: "newsSection",
    change_byline: false,
    author_name: location?.state.author_name,

    source: location?.state.source,
  };

  const [values, setValues] = useState(initialValues);

  const [imagePreview, setImagePreview] = useState(
    `http://174.138.101.222:8080${values.image}`
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "image") {
      setValues({ ...values, [name]: event.target.files[0] });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setValues({ ...values, [name]: value });
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////// To send Update request ///////////////////////////////////////

  const UpdateHandeler = () => {
    let formdata = new FormData();
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        formdata.append(key, values[key]);
      }
    }
    console.log(formdata);
    axios({
      method: "put",
      url: `http://174.138.101.222:8080/UpdateArticle`,
      data: formdata,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then(async (response) => {
        alert(response.data.message);
        navigate("/news-approval");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };
  ///////////////////////////////// To send axios request ///////////////////////////////////////

  return (
    <>
      <Navbar />
      <div className="parentContainer">
        <h1 className="bg-red">
          <span onClick={() => navigate(-1)} className="pointer">
            <HiOutlineArrowSmallLeft className="rightShift"/>
          </span>
          <span>Edit Article</span>
        </h1>

        <FormControl className="FormControl">
          <InputLabel id="demo-simple-select-helper-label">
            {location ? location.state.category : "Category"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="PLATFORM"
            name="category"
            value={values.category}
            onChange={handleInputChange}
          >
            {categories.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <div className="ckeditor FormControl">
          <p className="cktitle ">Title *</p>
          <CKEditor
            editor={Editor}
            config={{
              fontFamily: {
                options: [
                  "Ubuntu, Arial, sans-serif",
                  "Ubuntu Mono, Courier New, Courier, monospace",
                  "bhaskar, chanakya",
                ],
              },
              language: "en",
            }}
            data={values.title}
            name="title"
            value={values.title}
            onChange={(event, editor) => {
              const data = editor.getData();
              setValues({
                ...values,
                title: data,
              });
            }}
          />
        </div>

        <div className="ckeditor FormControl">
          <p className="cktitle">Summary / Short Details *</p>
          <CKEditor
            editor={Editor}
            config={{
              fontFamily: {
                options: [
                  "default",
                  "Ubuntu, Arial, sans-serif",
                  "Ubuntu Mono, Courier New, Courier, monospace",
                  "bhaskar, chanakya",
                ],
              },
            }}
            data={values.short_details}
            name="short_details"
            value={values.short_details}
            onChange={(event, editor) => {
              const data = editor.getData();
              setValues({
                ...values,
                short_details: data,
              });
            }}
          />
        </div>
        <div className={(styles.ckeditorBody, styles.ckeditor, "FormControl")}>
          <p className="cktitle">Body *</p>
          <CKEditor
            editor={Editor}
            config={{
              fontFamily: {
                options: [
                  "default",
                  "Ubuntu, Arial, sans-serif",
                  "Ubuntu Mono, Courier New, Courier, monospace",
                  "bhaskar, chanakya",
                ],
              },
            }}
            data={values.body}
            name="body"
            value={values.body}
            onChange={(event, editor) => {
              const data = editor.getData();
              setValues({
                ...values,
                body: data,
              });
            }}
          />
        </div>

        <img
          src={imagePreview}
          style={{
            height: "300px",
            width: "90%",
            objectFit: "contain",
            margin: "auto",
            border: "1px solid black",
          }}
        />

        <TextField
          id="outlined-basic"
          variant="outlined"
          type="file"
          className="FormControl"
          aria-label="Image"
          // value={values.image}
          name="image"
          onChange={handleInputChange}
        />

        <TextField
          id="outlined-basic"
          className="FormControl"
          label="Url"
          variant="outlined"
          name="url"
          value={values.url}
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-basic"
          label="Tags/Keywords"
          variant="outlined"
          className="FormControl"
          name="tags"
          value={values.tags}
          onChange={handleInputChange}
        />
        <FormControl className="FormControl">
          <InputLabel id="demo-simple-select-helper-label">
            News Priority
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="PLATFORM"
            name="news_priority"
            value={values.news_priority}
            onChange={handleInputChange}
          >
            <MenuItem value={"Breaking"}>Breaking</MenuItem>
            <MenuItem value={"Imported"}>Imported</MenuItem>
            <MenuItem value={"Normal"}>Normal</MenuItem>
            <MenuItem value={"Feature"}>Feature</MenuItem>
          </Select>
        </FormControl>

        {values.change_byline ? (
          <TextField
            id="outlined-basic"
            label="Author  Name"
            variant="outlined"
            className="FormControl"
            name="author_name"
            value={values.author_name}
            onChange={handleInputChange}
          />
        ) : (
          <FormControl className="FormControl">
            <InputLabel id="demo-simple-select-helper-label">
              Change Byline
            </InputLabel>

            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Change Byline"
              name="change_byline"
              value={values.change_byline}
              onChange={handleInputChange}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        )}

        <TextField
          id="outlined-basic"
          label="Source"
          className="FormControl"
          variant="outlined"
          name="source"
          value={values.source}
          onChange={handleInputChange}
        />

        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="News Sections"
          className=" FormControl"
        />

        <Button
          variant="contained"
          className="FormControl bg-red"
          onClick={() => {
            UpdateHandeler();
          }}
        >
          Update Article
        </Button>
      </div>
    </>
  );
};

export default EditArticle;

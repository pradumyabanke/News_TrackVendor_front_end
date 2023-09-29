import React, { useEffect, useState } from "react";
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
import { Autocomplete } from "@mui/material";

const Addnewsarticle = () => {
  const location = useLocation();
  // console.log(location.state);
  const navigate = useNavigate();

  ///////////////////////////////// To take user input ///////////////////////////////////////

  let initialValues = {
    category: location?.state.category,
    title: "",
    sub_heading: "Sub Heading",
    short_details: "",
    body: location?.state.body,
    image: "",
    url: "",
    tags: [],
    news_priority: "",
    news_sections: "newsSection",
    change_byline: false,
    author_name: "",
    source: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "image") {
      setValues({ ...values, [name]: event.target.files[0] });
      console.log(values);
    } else {
      setValues({ ...values, [name]: value });
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////// To Post News and Delete Draft ///////////////////////////////////

  const saveHandeler = () => {
    let formdata = new FormData();
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        formdata.append(key, values[key]);
      }
    }
    const newspaperAgencyAdminToken = localStorage?.getItem(
      "newspaperAgencyAdminToken"
    );
    const newspaperAgencyAdminId = localStorage?.getItem(
      "newspaperAgencyAdminId"
    );

    console.log(formdata);
    axios({
      method: "post",
      url: `http://174.138.101.222:8080/${newspaperAgencyAdminId}/post-news`,
      data: formdata,
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + newspaperAgencyAdminToken,
      },
    })
      .then(async (response) => {
        alert("Draft Edited Successfully and sent to Pending News");
        try {
          const response2 = await axios.delete(
            `http://174.138.101.222:8080/draft-article`,
            {
              data: { _id: location.state._id },
            }
          );
          navigate("/news-approval");
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };
  /////////////////////////////////////////////////////////////////////////////////////////

  const [categories, setCategory] = useState([]);
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://174.138.101.222:8080/getmastercategories"
      );
      // console.log(response.data.data, "categories");
      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [tags, setTags] = useState([]);
  const getTags = async () => {
    try {
      const response = await axios.get('http://174.138.101.222:8080/getmastertag');
      // console.log(response.data.data.map((item) => item.tag_name))
      setTags(response.data.data.map((item) => item.tag_name));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategories();
    getTags()
  }, []);


  const [style, setStyle] = useState("navbarbox");

  const changeStyle = () => {
    setStyle((prev) => {
      if (prev === 'navbarbox') {
        setStyle('navbarbox2')
      } else setStyle('navbarbox')
    });
  };

  // console.log(values.tags)

  return (
    <>
      <div className={style}>
        <Navbar />
      </div>
      <div className="parentContainer ">
        <h1 className="bg-red">
          <div className="dashwithfav">
            <span className="pointer" onClick={() => navigate(-1)}>
              <HiOutlineArrowSmallLeft className="rightShift" />
              Edit Draft</span>
            <div className="onclick" onClick={changeStyle}>
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
        </h1>

        <FormControl className="FormControl">
          <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="PLATFORM"
            name="category"
            value={values.category}
            onChange={handleInputChange}
          >
            {categories?.map((item) => {
              return (
                <MenuItem key={item._id} value={item.categories_Name_Url}>
                  {item.categories_Name_English} / {item.categories_Name_Hindi}
                </MenuItem>
              );
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
                  "bhaskar",
                  // "default",
                  "Ubuntu, Arial, sans-serif",
                  "Ubuntu Mono, Courier New, Courier, monospace",
                ],
              },
              language: "en",
            }}
            data="<p></p>"
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
            data="<p></p>"
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
                  "bhaskar, chanakya",
                  "Ubuntu, Arial, sans-serif",
                  "default",
                  "Ubuntu Mono, Courier New, Courier, monospace",
                ],
                supportAllValues: true,
              },
              font_defaultLabel: "bhaskar",
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
        {/* <TextField
          id="outlined-basic"
          label="Tags/Keywords"
          variant="outlined"
          className="FormControl"
          name="tags"
          value={values.tags}
          onChange={handleInputChange}
        /> */}
        <Autocomplete
          multiple
          className="FormControl"
          options={tags}
          getOptionLabel={(option) => option.tag_name}
          // value={values.tags}
          // onChange={(event, newValue) => {
          //   console.log(newValue.map((item)=>item.tag_name));


          // }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Tags/Keywords"
              placeholder="Add Tag"
            />
          )}
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
            saveHandeler();
          }}
        >
          Post News
        </Button>
      </div>
    </>
  );
};

export default Addnewsarticle;

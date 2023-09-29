import React, { useEffect, useState } from "react";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import Navbar from "./Navbar";

import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import axios from "axios";
import { Button } from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const UpdateCategories = () => {
  const [categories, setCategory] = useState([]);
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://174.138.101.222:8080/getmastercategories"
      );
      //   console.log(response.data.data, "categories");
      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const [value, setValue] = useState();
  const id = localStorage?.getItem("newspaperAgencyAdminId");

  let data = [];
  const handleCategory = async () => {
    value.forEach((element) => {
      data.push(element.categories_Name_Url);
    });

    console.log(data);
    try {
      const response = await axios.patch(
        `http://174.138.101.222:8080/update-categories/${id}`,
        data
      );
      console.log(response);
      data = [];
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="parentContainer">
        <h1 className="bg-red">
          <span>
            <HiOutlineArrowSmallLeft />
          </span>
          <span>Update categories</span>
        </h1>

        {categories && (
          <Autocomplete
            multiple
            options={categories}
            disableCloseOnSelect
            onChange={(event, newValue) => {
              setValue([...newValue]);
            }}
            getOptionLabel={(option) => option.categories_Name_English}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.categories_Name_English}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Selected Categories"
                placeholder="Add Category"
              />
            )}
          />
        )}
        <Button
          variant="contained"
          onClick={handleCategory}
          sx={{ width: "200px" }}
        >
          Add Categories
        </Button>
      </div>
    </>
  );
};

export default UpdateCategories;

import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { exportData } from "./data";

const range = ["above Average", "below average"];

function SelectComponent({ sendData }) {
  const [country, setCountry] = useState("");
  const [average, setAverage] = useState("");

  const filteredData = ({ countryVal = "", average = "" } = {}) => {
    if (!countryVal || !average) {
      sendData(exportData); // Send filtered data to parent component
    }

    const data = exportData.filter((item) => {
      if (countryVal === "All") {
        return true;
      } else {
        return item.foreign_country === countryVal;
      }
    });
    sendData(data); // Send filtered data to parent component
  };

  const newArray = exportData.map((item) => item.foreign_country);
  const countrySet = new Set(newArray);
  var countries = Array.from(countrySet);
  countries = ["All", ...countries];

  const handleChange = (event) => {
    const value = event.target.value;
    const countryVal = event.target.key;
    console.log(" key vakl ", countryVal, value, event.target);
    setCountry(value);
    filteredData({ countryVal: value });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        height={100}
        width={200}
        sx={{ minWidth: 120, minHeight: 120, margin: "0 10px" }}
      >
        <FormControl fullWidth sx={{ minHeight: 100 }}>
          <InputLabel
            id="demo-simple-select-label"
            sx={{ minWidth: 120, minHeight: 120 }}
          >
            Country
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={country}
            name="countryVal"
            label="Country"
            onChange={handleChange}
            sx={{ minHeight: 50, textTransform: "capitalize" }}
          >
            {countries.map((item) => (
              <MenuItem
                key={item}
                value={item}
                sx={{ textTransform: "capitalize" }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        height={100}
        width={200}
        sx={{ minWidth: 120, minHeight: 120, margin: "0 10px" }}
      >
        <FormControl fullWidth sx={{ minHeight: 100 }}>
          <InputLabel
            id=" average-label "
            sx={{ minWidth: 120, minHeight: 120 }}
          >
            Range
          </InputLabel>
          <Select
            labelId="average-label"
            id="average-select"
            value={average}
            label="Average"
            onChange={handleChange}
            sx={{ minHeight: 50, textTransform: "capitalize" }}
          >
            {range.map((item) => (
              <MenuItem
                key={item}
                value={item}
                sx={{ textTransform: "capitalize" }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* <Box
        height={100}
        width={200}
        sx={{ minWidth: 120, minHeight: 120, margin: "0 10px" }}
      >
        <FormControl fullWidth sx={{ minHeight: 100 }}>
          <InputLabel
            id="demo-simple-select-label"
            sx={{ minWidth: 120, minHeight: 120 }}
          >
            Country
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={country}
            label="Country"
            onChange={handleChange}
            sx={{ minHeight: 50, textTransform: "capitalize" }}
          >
            {countries.map((item) => (
              <MenuItem
                key={item}
                value={item}
                sx={{ textTransform: "capitalize" }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box> */}
    </div>
  );
}

SelectComponent.propTypes = {
  sendData: PropTypes.func.isRequired,
};

export default SelectComponent;

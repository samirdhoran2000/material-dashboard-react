//select component
import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import { exportData } from "./data";

const range = ["above Average", "below average"];

function SelectComponent({ sendData }) {
  const [country, setCountry] = useState("All");
  const [averageQuantity, setAverageQuantity] = useState("");
  const [averagePrice, setAveragePrice] = useState("");
  const [average, setAverage] = useState();
  const [exportData, setExportData] = useState([]);

  const getAverageData = (country = "") => {
    const fun = async () => {
      const res = await fetch(
        `http://localhost:3000/api/getAverageData?country=${country}`
      );
      const data = await res.json();
      setAverage(data?.result?.rows);
      // setAverageQuantity(data?.result);
      console.log("fun data get successfully in dashboard ", data);
    };
    fun();
  };

  useEffect(() => {
    const fun = async () => {
      const res = await fetch("http://localhost:3000/api/getExportData");
      const data = await res.json();
      setExportData(data?.result?.rows);
      console.log("fun data get successfully exported ", data?.result);
    };
    fun();
    getAverageData();
  }, []);

  const filteredData = ({
    countryVal = "",
    averageQuantity = "",
    averagePrice = "",
    consigneeCount = "",
  } = {}) => {
    if (!countryVal || !averageQuantity || !averagePrice || !consigneeCount) {
      sendData({
        exportData: exportData,
        country: country,
        averageQuantity: averageQuantity,
        averagePrice: averagePrice,
        consigneeCount: consigneeCount,
      }); // Send filtered data to parent component
    }

    const data = exportData.filter((item) => {
      if (countryVal === "All") {
        return true;
      } else {
        return item.foreign_country === countryVal;
      }
    });

    const avgPrice = average.filter((item) => {
      if (countryVal === "All") {
        return true;
      } else {
        return item.foreign_country == countryVal;
      }
    });
    console.log("average price in select coponent ", avgPrice);
    sendData({
      exportData: data,
      country: countryVal,
      averagePrice: avgPrice[0]?.average_price,
      averageQuantity: avgPrice[0]?.average_quantity,
      consigneeCount: avgPrice[0]?.consignee_count,
    }); // Send filtered data to parent component
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
      {/* <Box
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
      </Box> */}
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

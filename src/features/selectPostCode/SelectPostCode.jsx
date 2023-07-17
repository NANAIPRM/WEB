import React, { useContext, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { HouseDataContext } from "../../contexts/HouseDataContext";

export default function SelectPostCode() {
  const { houseData, setHouseData } = useContext(HouseDataContext);
  const [postcode, setPostcode] = useState("");
  const [averagePrice, setAveragePrice] = useState(0);
  const [medianPrice, setMedianPrice] = useState(0);

  const uniquePostcodes = [...new Set(houseData.map((item) => item.post_code))];

  const handleChange = (event) => {
    const selectedPostcode = event.target.value;
    setPostcode(selectedPostcode);

    // กรองรายการที่มี postcode ตรงกับที่เลือก
    const filteredData = houseData.filter(
      (item) => item.post_code === selectedPostcode
    );

    // คำนวณค่าเฉลี่ย (average)
    const total = filteredData.reduce((sum, item) => sum + item.price, 0);
    const average = total / filteredData.length;
    setAveragePrice(average);

    // คำนวณค่ากลาง (median)
    const sortedPrices = filteredData
      .map((item) => item.price)
      .sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedPrices.length / 2);
    const median =
      sortedPrices.length % 2 === 0
        ? (sortedPrices[middleIndex - 1] + sortedPrices[middleIndex]) / 2
        : sortedPrices[middleIndex];
    setMedianPrice(median);
  };

  return (
    <div className="flex flex-col justify-center items-start">
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <Select
          value={postcode}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>SELECT POST CODE</em>
          </MenuItem>
          {uniquePostcodes.map((postcode) => (
            <MenuItem key={postcode} value={postcode}>
              {postcode}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {postcode && (
        <div className="flex flex-col gap-2 px-4">
          <p className="text-blue-800 font-semibold">Average: {averagePrice}</p>
          <p className="text-blue-800 font-semibold">Median: {medianPrice}</p>
        </div>
      )}
    </div>
  );
}

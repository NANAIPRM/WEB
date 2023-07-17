import React, { createContext, useState } from "react";

import data from "../MOCK_DATA.json";
// สร้าง Context
export const HouseDataContext = createContext();

export const HouseDataProvider = ({ children }) => {
  const [houseData, setHouseData] = useState(data);

  return (
    <HouseDataContext.Provider value={{ houseData, setHouseData }}>
      {children}
    </HouseDataContext.Provider>
  );
};

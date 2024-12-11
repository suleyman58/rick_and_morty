import React, { useState } from "react";
import '../component.css'

const DropdownComponent = ({
  label,
  setFilterName,
  filterName,
  options
}: {
  label: string;
  setFilterName: (value: string) => void;
  filterName: string;
  options: string[];
}) => {

    console.log("filterName",filterName )
    
 
  return (
    <div>
      <label style={{ margin: "0px 10px" }}>{label}</label>
      <select
        value={filterName}
        className="select"
        onChange={(e) => {
          const value = e.target.value; // Seçilen değeri al
          setFilterName(value); // filterName'i seçilen değer ile güncelle
        }}
      >
      {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownComponent;

import React from "react";
import './component.css'; 

interface DropdownProps {
  label: string;
  setFilterName: (value: string) => void;
  filterName: string;
  options: string[];
}

const DropdownComponent: React.FC<DropdownProps> = ({
  label,
  setFilterName,
  filterName,
  options
}) => {

  console.log("filterName", filterName);

  return (
    <div className="dropdown-container">
      <label htmlFor="dropdown" className="dropdown-label">{label}</label>
      <select
        id="dropdown"
        value={filterName}
        className="dropdown-select"
        onChange={(e) => {
          const value = e.target.value;
          setFilterName(value);
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

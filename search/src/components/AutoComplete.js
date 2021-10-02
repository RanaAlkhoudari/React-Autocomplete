import React, { useState } from "react";
import SearchName from "./SearchName";
import SearchOrigins from "./SearchOrigins";
import Select from "react-select";

function AutoComplete() {
  const [input, setInput] = useState("");

  function onChangeSelect(item) {
    setInput(item);
  }
  const options = [
    { value: "name", label: "Name" },
    { value: "origin", label: "Origin" },
  ];

  return (
    <>
      <div className="background">
        <div className="select">
          <Select
            value={input}
            options={options}
            onChange={onChangeSelect}
            placeholder="Search..."
          />
        </div>
        {input.value === "name" && <SearchName />}
        {input.value === "origin" && <SearchOrigins />}
      </div>
    </>
  );
}
export default AutoComplete;

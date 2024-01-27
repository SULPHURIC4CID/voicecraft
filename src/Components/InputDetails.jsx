/*
  InputDetails.jsx
  Author: Anantha Narayanan
  Created: 14-01-2024
  Last Modified: 16-01-2024
  Project: Text to Voice

  This component allows the user to select the type of text input (text, URL, or file) and updates the IVR context accordingly.
*/

import React from "react";
import { useContext } from "react";
import { IVRContext } from "../Context/ContextProvider";

const InputDetails = () => {
  const ivrContext = useContext(IVRContext);

  let handleInputChange = (event) => {
    ivrContext.setParameters({
      ...ivrContext.parameters,
      inputType: event.target.value,
    });
    console.log(event.target.value);
    console.log(ivrContext);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:text-2xl text-xl gap-x-20">
      <div className=" text-center lg:text-left lg:w-1/6">
        Select the type of text input
      </div>
      <div className="flex flex-row gap-x-5 items-center">
        Text
        <input
          type="radio"
          value="text"
          checked={ivrContext.parameters.inputType === "text"}
          onChange={handleInputChange}
        ></input>
      </div>
      <div className="flex flex-row gap-x-5 items-center">
        URL
        <input
          type="radio"
          value="url"
          checked={ivrContext.parameters.inputType === "url"}
          onChange={handleInputChange}
        ></input>
      </div>
      <div className="flex flex-row gap-x-5 items-center">
        Upload a File
        <input
          type="radio"
          value="file"
          checked={ivrContext.parameters.inputType === "file"}
          onChange={handleInputChange}
        ></input>
      </div>
    </div>
  );
};

export default InputDetails;

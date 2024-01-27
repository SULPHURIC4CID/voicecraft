/*
  InputBlock.jsx
  Author: Anantha Narayanan
  Created: 14-01-2024
  Last Modified: 16-01-2024
  Project: Text to Voice

  This file contains the InputBlock component, which provides input controls for text, URL, and file path. It interacts with the IVRContext to manage the input type and content.
*/

import React from "react";

import { useContext } from "react";
import { IVRContext } from "../Context/ContextProvider";

const InputBlock = () => {
  const ivrContext = useContext(IVRContext);

  let handleTextChange = (event) => {
    ivrContext.setParameters({
      ...ivrContext.parameters,
      textContent: event.target.value,
    });
  };

  let handleURLChange = (event) => {
    ivrContext.setParameters({
      ...ivrContext.parameters,
      url: event.target.value,
    });
  };

  let handleFilePathChange = (event) => {
    ivrContext.setParameters({
      ...ivrContext.parameters,
      file: event.target.files[0],
    });
  };

  let renderInputBlock = () => {
    if (ivrContext.parameters.inputType === "text") {
      return (
        <div className="flex lg:flex-row flex-col lg:text-2xl text-xl gap-x-10">
          <div className=" text-center lg:text-left lg:w-1/6">
            Enter the text content
          </div>
          <textarea
            rows="10"
            placeholder="Enter text"
            value={ivrContext.textContent}
            onChange={handleTextChange}
            className=" w-full lg:px-5 px-2 py-1 rounded-xl"
          ></textarea>
        </div>
      );
    } else if (ivrContext.parameters.inputType === "url") {
      return (
        <div className="flex lg:flex-row flex-col lg:text-2xl text-xl gap-x-10">
          <div className=" text-center lg:text-left lg:w-1/6">
            {" "}
            Enter the Document URL
          </div>
          <input
            placeholder="Enter the document URL"
            value={ivrContext.url}
            onChange={handleURLChange}
            className="px-5 rounded-xl w-full"
          ></input>
        </div>
      );
    } else {
      return (
        <div className="pt-10">
          <div className="flex lg:flex-row flex-col lg:text-2xl text-xl gap-x-10">
            <div className=" text-center lg:text-left lg:w-1/6">
              {" "}
              Enter the File Path
            </div>
            <input
              type="file"
              placeholder="Enter the File path"
              onChange={handleFilePathChange}
              className="px-5 rounded-xl w-full"
            ></input>
          </div>
        </div>
      );
    }
  };

  return <div>{renderInputBlock()}</div>;
};

export default InputBlock;

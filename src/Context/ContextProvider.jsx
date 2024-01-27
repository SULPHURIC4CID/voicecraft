/*
  ContextProvider.jsx
  Author: Anantha Narayanan
  Created: 14-01-2024
  Last Modified: 16-01-2024
  Project: Text to Voice

  This component is used to create react states and bundle them together into a single context that can be used throughtout the scope of the ContextProvider.
*/

import React from "react";
import { createContext } from "react";
import { useState } from "react";
import axios from "axios";

export const IVRContext = createContext();

const ContextProvider = (props) => {
  //Axios Utility function

  let axiosUtility = (setState, url, method, payload = {}) => {
    console.log("TESTING:", url, method, payload);
    let temp = () => {
      return new Promise((resolve, reject) => {
        switch (method) {
          case "GET":
            axios
              .get(url, payload)
              .then((response) => {
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              });
            break;

          case "POST":
            console.log("PAYLOAD:", payload);
            axios
              .post(url, payload)
              .then((response) => {
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              });
            break;

          case "PUT":
            console.log("PAYLOAD:", payload);
            axios
              .put(url, payload)
              .then((response) => {
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              });
            break;

          default:
            break;
        }
      });
    };
    temp()
      .then((response) => {
        console.log("SUCCESS");
        setState(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // State 1 - Defining a complicated State that has information about all the voice parameters needed.
  const [parameters, setParameters] = useState({
    inputType: "text",
    textContent: "",
    url: "",
    file: {},
    voice: {
      voiceID: "",
      name: "",
      description: "",
      gender: "",
      type: "",
    },
    voiceConfiguration: {
      stability: 50,
      clarity: 50,
      style: 0,
      speakerBoost: false,
    },
    fileStatus: false,
    audioFileName: "",
  });

  //State 2 - a State for the managing the login information of the user.
  const [loginParameters, setLoginParameters] = useState({
    loginStatus: false,
    username: "",
    id: 0,
  });

  //setting up the IVR Context
  let value = {
    parameters,
    setParameters,
    loginParameters,
    setLoginParameters,
    axiosUtility,
  };

  return (
    <IVRContext.Provider value={value}>{props.children}</IVRContext.Provider>
  );
};

export default ContextProvider;

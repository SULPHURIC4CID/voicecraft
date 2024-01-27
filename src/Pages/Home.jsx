/*
  Home.jsx
  Author: Anantha Narayanan
  Created: 14-01-2024
  Last Modified: 16-01-2024
  Project: Text to Voice

  This file is used to render the home page (empty for now).
*/

import React from "react";

import { useContext } from "react";
import { IVRContext } from "../Context/ContextProvider";
import axios from "axios";
import { useState } from "react";

const Home = () => {
  const ivrContext = useContext(IVRContext);
  const [voice, setVoice] = useState(null);

  let getData = async () => {
    //abstract the axios call
    console.log("PONTER");
    setVoice(ivrContext.axiosUtility("http://localhost:8080/voice", "GET"));

    console.log("Voice:", voice);
  };
  return (
    <div className="bg-blue-200 m-20 p-10 text-4xl text-black text-center flex flex-col jutify-center items-center">
      Welcome to the Home Page.
      <button className="text-4xl bg-white text-black w-fit" onClick={getData}>
        ZENDESK API TESTING
      </button>
    </div>
  );
};

export default Home;

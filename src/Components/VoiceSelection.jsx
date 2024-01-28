/*
  Convert.jsx
  Author: Anantha Narayanan
  Created: 14-01-2024
  Last Modified: 16-01-2024
  Project: Text to Voice

  This file is used to retrieve the voices from the DB via the backend and render the voice cards.
*/

import React from "react";
import axios from "axios";
import { useState } from "react";
import VoiceDetails from "./VoiceDetails";
import { useContext } from "react";
import { IVRContext } from "../Context/ContextProvider";

const VoiceSelection = () => {
  const [voiceData, setVoiceData] = useState([]);
  const ivrContext = useContext(IVRContext);
  //Function to generate all the stored voices from IVRContext (ContextProvider.jsx)
  let renderVoiceOptions = () => {
    //Get the voice details from the DM via backend
    //
    // OLD CODE
    //
    // axios
    //   .get("http://localhost:8080/voice")
    //   .then((response) => {
    //     setVoiceData(response.data);
    //   })
    //   .catch((error) => {
    //     console.log("Failed to fetch voice data", error);
    //   });

    //NEW CODE
    if (voiceData.length == 0)
      ivrContext.axiosUtility(
        setVoiceData,
        "http://localhost:8080/voice",
        "GET"
      );

    //Display the voices retieved
    return (
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-2 justify-items-center">
        {voiceData.map((voice) => {
          return (
            <div key={voice.name}>
              <VoiceDetails details={voice}></VoiceDetails>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row lg:gap-x-10 pt-10">
      <div className=" text-center lg:text-left lg:w-1/6 lg:text-2xl text-xl">
        Select a voice
      </div>
      <div className="lg:w-5/6">{renderVoiceOptions()}</div>
    </div>
  );
};

export default VoiceSelection;

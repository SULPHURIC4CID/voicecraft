/*
  Configuration.jsx
  Author: Anantha Narayanan
  Created: 14-01-2024
  Last Modified: 16-01-2024
  Project: Text to Voice

  This file renders the Convert button and the post-converted Audio sample
  and contains the handling logic on what happens when the Convert button is clicked.
*/

import React from "react";
import { useContext } from "react";
import { IVRContext } from "../Context/ContextProvider";

import { IoMdDownload } from "react-icons/io";
import axios from "axios"; // Require this to make API calls

const ConvertButton = () => {
  const ivrContext = useContext(IVRContext);
  console.log(ivrContext.parameters);

  let processResponse = (data) => {
    let temp = {
      ...ivrContext.parameters,
      fileStatus: true,
      audioFileName: data,
    };
    ivrContext.setParameters(temp);
  };

  //This function for now displays the input and voice configuration data to the console. But it can be modified using axios to send the data to an API endpoint.
  let sendData = () => {
    //Clear old state parameters
    let temp = {
      ...ivrContext.parameters,
      fileStatus: false,
      audioFileName: "",
    };
    ivrContext.setParameters(temp);
    /*
    Request Structure-
    {
      requestId : 1,
      textContent : "Sample text to be converted",
      voiceDetails:{
        name: "Zoe",
        voiceId: "s7cGGyzMgx8nrexdOJlS",
        description: "Hyped Characters and Animation.",
        gender: "Female",
        type: "Middle-Aged American",
        inUse: false,
        voiceConfiguration:{
          stability: 78
          clarity: 67
          style: 56
          speakerBoost: true,
        }
      }
    }
    */

    let payload = {};

    payload.requestId = 1;
    payload.textContent = ivrContext.parameters.textContent;

    payload.voiceDetails = ivrContext.parameters.voice;

    payload.voiceDetails.voiceConfiguration =
      ivrContext.parameters.voiceConfiguration;

    console.log("Payload:", payload);

    //Send the data to the backend server
    //
    // Old Code
    //
    // axios
    //   .post("http://localhost:8080/credentials/generateVoice", payload)
    //   .then((response) => {
    //     console.log("Response.data : ", response.data);
    //     let temp = {
    //       ...ivrContext.parameters,
    //       fileStatus: true,
    //       audioFileName: response.data,
    //     };
    //     ivrContext.setParameters(temp);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    //New Code
    ivrContext.axiosUtility(
      processResponse,
      "http://localhost:8080/credentials/generateVoice",
      "POST",
      payload
    );
  };

  let displayAudio = () => {
    return (
      <div className="flex flex-row gap-x-10 justify-center items-center my-10">
        <div className="flex flex-row justify-center items-center gap-x-10 text-2xl">
          <div>Converted Audio file</div>
          <audio controls>
            <source
              src={
                "./text-to-voice/downloaded-audio/" +
                ivrContext.parameters.audioFileName
              }
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
        </div>
        <a
          href={"./text-to-voice/downloaded-audio/" + ivrContext.audioFileName}
          download
        >
          <IoMdDownload className="text-4xl"></IoMdDownload>
        </a>
      </div>
    );
  };

  return (
    <div>
      <div className=" flex flex-row -gap-x-2 mt-20 items-center justify-evenly">
        <button
          onClick={sendData}
          className="text-3xl rounded-2xl border bg-blue-500 py-5 px-10 w-1/2 text-white hover:bg-blue-600 active:bg-blue-500"
        >
          Convert
        </button>
      </div>
      {ivrContext.parameters.fileStatus === true ? (
        <div>{displayAudio()}</div>
      ) : (
        localStorage.setItem("AudioFileStatus", false)
      )}
    </div>
  );
};

export default ConvertButton;

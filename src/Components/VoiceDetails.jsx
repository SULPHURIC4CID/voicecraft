/*
  VoiceDetails.jsx
  Author: Anantha Narayanan
  Created: 14-01-2024
  Last Modified: 16-01-2024
  Project: Text to Voice

  This component is used to generate and display details associated with a single voice from ElevenLabs within a button.
*/

import React from "react";
import { useContext } from "react";
import { IVRContext } from "../Context/ContextProvider";

const VoiceDetails = (props) => {
  const ivrContext = useContext(IVRContext);

  let handleOnClick = (event) => {
    let temp = { ...ivrContext.parameters, voice: props.details };
    ivrContext.setParameters(temp);
  };

  let getBackground = () => {
    if (props.details.name === ivrContext.parameters.voice.name)
      return "bg-yellow-200 rounded-xl p-5 hover:bg-yellow-200 border-4 border-black";
    else
      return "bg-white rounded-xl p-5 hover:bg-yellow-200 border-4 border-transparent";
  };

  return (
    <button
      id={props.details.name}
      className={getBackground()}
      onClick={handleOnClick}
    >
      <div className="text-xl font-bold ">{props.details.name}</div>
      <div>{props.details.type}</div>
      <div className="text-blue-500">{props.details.gender}</div>
      <div className="text-slate-500">{props.details.description}</div>
      <div className="flex flex-row justify-evenly mt-5">
        <audio controls>
          <source
            src={"./text-to-voice/" + props.details.name + ".mp3"} //./audio/Marcus.mp3
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
    </button>
  );
};

export default VoiceDetails;

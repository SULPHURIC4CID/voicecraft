/*
  Configuration.jsx
  Author: Anantha Narayanan
  Created: 14-01-2024
  Last Modified: 16-01-2024
  Project: Text to Voice

  This file contains the component for configuring voice settings.

  This component provides controls for adjusting stability, clarity, style, and speaker boost settings for voice synthesis. It includes information tooltips for each setting and allows users to interactively modify the voice configuration.
*/

import React from "react";
import { useContext } from "react";
import { IVRContext } from "../Context/ContextProvider";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useState } from "react";

const Configuration = () => {
  const ivrContext = useContext(IVRContext);

  const stabilityInfo =
    "Increasing variability can make speech more expressive with output varying between re-generations. It can also lead to instabilities. Increasing stability will make the voice more consistent between re-generations, but it can also make it sound a bit monotone. On longer text fragments we recommend lowering this value.";

  const clarityInfo =
    "High enhancement boosts overall voice clarity and target speaker similarity. Very high values can cause artifacts, so adjusting this setting to find the optimal value is encouraged.";

  const styleInfo =
    "High values are recommended if the style of the speech should be exaggerated compared to the uploaded audio. Higher values can lead to more instability in the generated speech. Setting this to 0 will greatly increase generation speed and is the default setting.";

  const speakerBoostInfo =
    "Boost the similarity of the synthesized speech and the voice at the cost of some generation speed.";

  //States to maintain the info status of each voice property
  const [stabilityHover, setStabilityHover] = useState(false);
  const [clarityHover, setClarityHover] = useState(false);
  const [styleHover, setStyleHover] = useState(false);
  const [speakerBoostHover, setSpeakerBoostHover] = useState(false);

  let handleOnChange = (event) => {
    let tempConfiguration = { ...ivrContext.parameters };
    switch (event.target.id) {
      case "stability":
        tempConfiguration.voiceConfiguration.stability = parseInt(
          event.target.value
        );
        break;
      case "clarity":
        tempConfiguration.voiceConfiguration.clarity = parseInt(
          event.target.value
        );
        break;
      case "style":
        tempConfiguration.voiceConfiguration.style = parseInt(
          event.target.value
        );
        break;
      default:
        break;
    }
    ivrContext.setParameters(tempConfiguration);
  };

  //Toggle the info so that only one voice property information is displayed
  let toggleStabilityInfo = () => {
    if (stabilityHover === false) {
      setStabilityHover(true);
      setClarityHover(false);
      setStyleHover(false);
      setSpeakerBoostHover(false);
    } else {
      setStabilityHover(false);
      setClarityHover(false);
      setStyleHover(false);
      setSpeakerBoostHover(false);
    }
  };

  let toggleClarityInfo = () => {
    if (clarityHover === false) {
      setClarityHover(true);
      setStabilityHover(false);
      setStyleHover(false);
      setSpeakerBoostHover(false);
    } else {
      setStabilityHover(false);
      setClarityHover(false);
      setStyleHover(false);
      setSpeakerBoostHover(false);
    }
  };

  let toggleStyleInfo = () => {
    if (styleHover === false) {
      setStyleHover(true);
      setStabilityHover(false);
      setClarityHover(false);
      setSpeakerBoostHover(false);
    } else {
      setStabilityHover(false);
      setClarityHover(false);
      setStyleHover(false);
      setSpeakerBoostHover(false);
    }
  };

  let toggleSpeakerBoostInfo = () => {
    if (speakerBoostHover === false) {
      setSpeakerBoostHover(true);
      setStyleHover(false);
      setStabilityHover(false);
      setClarityHover(false);
    } else {
      setSpeakerBoostHover(false);
      setStabilityHover(false);
      setClarityHover(false);
      setStyleHover(false);
    }
  };

  let handleSpeakerBoostChange = () => {
    let tempConfiguration = { ...ivrContext.parameters };
    tempConfiguration.voiceConfiguration.speakerBoost =
      !ivrContext.parameters.voiceConfiguration.speakerBoost;
    ivrContext.setParameters(tempConfiguration);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:gap-x-5 lg:text-2xl text-xl mt-10">
      <div className="lg:w-1/6 text-center lg:text-left">
        Voice Configurations
      </div>
      <div className="lg:w-5/6">
        <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-5 items-center">
          <div className="lg:w-1/2 lg:text-left text-center">Stability</div>
          <input
            id="stability"
            type="range"
            min="0"
            max="100"
            value={ivrContext.parameters.voiceConfiguration.stability}
            className="w-full"
            onChange={handleOnChange}
          ></input>
          <div>{ivrContext.parameters.voiceConfiguration.stability}</div>
          <div className="relative">
            <IoInformationCircleOutline
              onClick={toggleStabilityInfo}
              className=" text-blue-600 lg:text-5xl text-xl hover:text-blue-700"
            ></IoInformationCircleOutline>
            {stabilityHover ? (
              <div className="absolute lg:top-0 top-5 lg:right-16 right-0 border border-blue-900 rounded-xl lg:p-10 p-1 text-black bg-white lg:text-sm text-xs lg:w-96 w-52 z-10">
                {stabilityInfo}
              </div>
            ) : (
              localStorage.setItem("test", 123)
            )}
          </div>
        </div>
        <br></br>
        <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-5 items-center">
          <div className="lg:w-1/2 lg:text-left text-center">
            Clarity + Similarity Enhancement
          </div>
          <input
            id="clarity"
            type="range"
            min="0"
            max="100"
            value={ivrContext.parameters.voiceConfiguration.clarity}
            className="w-full"
            onChange={handleOnChange}
          ></input>
          <div>{ivrContext.parameters.voiceConfiguration.clarity}</div>
          <div className="relative">
            <IoInformationCircleOutline
              onClick={toggleClarityInfo}
              className="text-blue-600 lg:text-5xl text-xl hover:text-blue-700"
            ></IoInformationCircleOutline>
            {clarityHover ? (
              <div className="absolute lg:top-0 top-5 lg:right-16 right-0 border border-blue-900 rounded-xl lg:p-10 p-1 text-black bg-white lg:text-sm text-xs lg:w-96 w-52 z-10">
                {clarityInfo}
              </div>
            ) : (
              localStorage.setItem("test", 123)
            )}
          </div>
        </div>
        <br></br>
        <div className="flex flex-col lg:flex-row lg:gap-x-5 items-center">
          <div className="lg:w-1/2 lg:text-left text-center">Style</div>
          <input
            id="style"
            type="range"
            min="0"
            max="100"
            value={ivrContext.parameters.voiceConfiguration.style}
            className="w-full"
            onChange={handleOnChange}
          ></input>
          <div>{ivrContext.parameters.voiceConfiguration.style}</div>
          <div className="relative">
            <IoInformationCircleOutline
              className="text-blue-600 lg:text-5xl text-xl hover:text-blue-700"
              onClick={toggleStyleInfo}
            ></IoInformationCircleOutline>
            {styleHover ? (
              <div className="absolute lg:top-0 top-5 lg:right-16 right-0 border border-blue-900 rounded-xl lg:p-10 p-1 text-black bg-white lg:text-sm text-xs lg:w-96 w-52 z-10">
                {styleInfo}
              </div>
            ) : (
              localStorage.setItem("test", 123)
            )}
          </div>
        </div>
        <br></br>
        <div className="flex flex-col lg:flex-row lg:gap-x-5 items-center">
          <div className="lg:text-left text-center">Speaker Boost</div>
          <input
            type="checkbox"
            checked={ivrContext.parameters.voiceConfiguration.speakerBoost}
            onChange={handleSpeakerBoostChange}
            className="h-6 w-6"
          ></input>
          <div className="relative">
            <IoInformationCircleOutline
              onClick={toggleSpeakerBoostInfo}
              className=" text-blue-600 lg:text-5xl text-xl hover:text-blue-700"
            ></IoInformationCircleOutline>
            {speakerBoostHover ? (
              <div className="absolute lg:top-0 top-5 lg:left-16 right-0 border border-blue-900 rounded-xl lg:p-10 p-1 text-black bg-white lg:text-sm text-xs lg:w-96 w-52 z-10">
                {speakerBoostInfo}
              </div>
            ) : (
              localStorage.setItem("test", 123) // Dummy msg in else part
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;

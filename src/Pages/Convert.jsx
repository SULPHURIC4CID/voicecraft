/*
  Convert.jsx
  Author: Anantha Narayanan
  Created: 14-01-2024
  Last Modified: 16-01-2024
  Project: Text to Voice

  This file is used to render the /convert page, it comprises of the various text to voice components.
*/

import React from "react";
import Configuration from "../Components/Configuration";
import { useContext } from "react";
import { IVRContext } from "../Context/ContextProvider";
import InputDetails from "../Components/InputDetails";
import InputBlock from "../Components/InputBlock";
import VoiceSelection from "../Components/VoiceSelection";
import ConvertButton from "../Components/ConvertButton";

const Home = () => {
  const ivrContext = useContext(IVRContext);

  return (
    <div className="bg-blue-200 min-w-screen p-5 border-black border-2 rounded-xl">
      {ivrContext.loginParameters.loginStatus ? (
        <div>
          <div className="text-center py-5 lg:text-3xl text-xl font-bold">
            TEXT TO VOICE Configuration
          </div>
          <div>
            <InputDetails></InputDetails>
            <InputBlock></InputBlock>
            <VoiceSelection></VoiceSelection>
            <Configuration></Configuration>
            <ConvertButton></ConvertButton>
          </div>
        </div>
      ) : (
        <div className="text-center py-5 lg:text-3xl text-xl font-bold">
          Please Login First from the Account Tab. Before trying to Convert.
        </div>
      )}
    </div>
  );
};

export default Home;

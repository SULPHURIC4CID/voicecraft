/*
  NavigationBar.jsx
  Author: Anantha Narayanan
  Created: 14-01-2024
  Last Modified: 16-01-2024
  Project: Text to Voice

  This component is used to generate and display the header/navigation bar used in the application.
*/

import React from "react";
import NavigationButton from "./NavigationButton";

import { useContext } from "react";
import { IVRContext } from "../Context/ContextProvider";

const NavigationBar = () => {
  const ivrContext = useContext(IVRContext);
  return (
    <div className="sticky top-0 z-20">
      <div
        className="bg-contain"
        style={{
          backgroundImage: 'url("./text-to-voice/blue_background.jpg")',
        }}
      >
        <div className="bg-auto bg-center text-center lg:text-7xl text-4xl lg:py-5 py-3 text-white">
          VOICE CRAFT
        </div>

        <div className="text-center text-white lg:text-3xl text-2xl lg:mb-5">
          Converting Text to Voice
        </div>
        <div className="flex flex-row justify-around py-5">
          <NavigationButton nav="">HOME</NavigationButton>
          <NavigationButton nav="convert">CONVERT</NavigationButton>
          <NavigationButton nav="login">ACCOUNT</NavigationButton>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;

/*
  NavigationButton.jsx
  Author: Anantha Narayanan
  Created: 14-01-2024
  Last Modified: 16-01-2024
  Project: Text to Voice

  This component is used to generate and display the custom buttons used in the NavigationBar.
*/

import React from "react";
import { useNavigate } from "react-router-dom";

const NavigationButton = (props) => {
  const navigate = useNavigate();
  return (
    <button
      className="text-white lg:text-3xl tetx-xl hover:text-yellow-500 bg-transparent"
      onClick={() => {
        navigate("/" + props.nav);
      }}
    >
      {props.children}
    </button>
  );
};

export default NavigationButton;

/*
  Configuration.jsx
  Author: Anantha Narayanan
  Created: 14-01-2024
  Last Modified: 16-01-2024
  Project: Text to Voice

  This component provides the styling of a buttons used in the Login page.
*/

import React from "react";

const LoginButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="text-center py-5 lg:text-3xl text-xl font-bold hover:bg-blue-300"
    >
      {props.children}
    </button>
  );
};

export default LoginButton;

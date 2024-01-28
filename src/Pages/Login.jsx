/*
  Login.jsx
  Author: Anantha Narayanan
  Created: 14-01-2024
  Last Modified: 16-01-2024
  Project: Text to Voice

  This file is used to render the login page.
  Basic authentication is enabled, with the provision to change the password.
*/

import React from "react";

import { useContext } from "react";
import { IVRContext } from "../Context/ContextProvider";
import BasicAuthPostLogin from "../Components/BasicAuthPostLogin";
import BasicAuthPreLogin from "../Components/BasicAuthPreLogin";
import OAuthPreLogin from "../Components/OAuthPreLogin";
import OAuthPostLogin from "../Components/OAuthPostLogin";
import PreLogin from "../Components/PreLogin";

const Login = () => {
  const ivrContext = useContext(IVRContext);

  let renderLogin = () => {
    if (ivrContext.loginParameters.loginStatus) {
      if (ivrContext.loginParameters.loginType === "basic") {
        return <BasicAuthPostLogin />;
      } else {
        return <OAuthPostLogin />;
      }
    } else {
      if (ivrContext.loginParameters.loginType === "basic") {
        return (
          <div className="flex flex-col justify-center items-center">
            <PreLogin />
            <BasicAuthPreLogin />
          </div>
        );
      } else {
        return (
          <div className="flex flex-col justify-center items-center">
            <PreLogin />
            <OAuthPreLogin />
          </div>
        );
      }
    }
  };

  return (
    <div>
      <div className="bg-blue-200 min-w-screen p-5 border-black border-2 rounded-xl">
        {renderLogin()}
      </div>
    </div>
  );
};

export default Login;

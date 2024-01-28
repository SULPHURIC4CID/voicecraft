import React from "react";

import { useContext } from "react";
import { IVRContext } from "../Context/ContextProvider";

const PreLogin = () => {
  const ivrContext = useContext(IVRContext);

  let handleInputChange = (event) => {
    let temp = { ...ivrContext.loginParameters, loginType: event.target.value };
    ivrContext.setLoginParameters(temp);
  };

  return (
    <div className="flex flex-col justify-center items-center text-2xl">
      <div className="text-3xl my-5">Choose Authetication Type</div>
      <div className="flex flex-col md:flex-row md:gap-x-10">
        <div className="flex flex-row justify-center items-center gap-x-5">
          Basic Authentication
          <input
            type="radio"
            checked={ivrContext.loginParameters.loginType === "basic"}
            value="basic"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="flex flex-row justify-center items-center gap-x-5">
          Google OAuth 2.0
          <input
            type="radio"
            checked={ivrContext.loginParameters.loginType === "oauth"}
            value="oauth"
            onChange={handleInputChange}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default PreLogin;

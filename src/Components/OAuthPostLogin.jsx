import React from "react";
import { useContext } from "react";
import { IVRContext } from "../Context/ContextProvider";

const OAuthPostLogin = () => {
  const ivrContext = useContext(IVRContext);

  let logoutUser = () => {
    let validateLogout = (response) => {
      if (response === "SUCCESS") {
        let temp = {
          ...ivrContext.loginParameters,
          loginType: "basic",
          loginStatus: false,
          username: " ",
          id: 0,
        };
        ivrContext.setLoginParameters(temp);
        alert("Logged out successfully.");
      } else {
        console.log("Unable to logout :", response);
      }
    };

    //Send a POST call to backend to revoke tokens
    ivrContext.axiosUtility(
      validateLogout,
      "http://localhost:8080/login/revoke/token",
      "POST"
    );
  };
  return (
    <div className="flex flex-row justify-center m-10 p-10 text-4xl items-center">
      <button
        onClick={logoutUser}
        className="rounded-xl bg-white p-10 hover:bg-yellow-200 active:bg-white"
      >
        LogOut
      </button>
    </div>
  );
};

export default OAuthPostLogin;

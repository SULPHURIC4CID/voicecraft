import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

import { useContext } from "react";
import { IVRContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

const OAuthPreLogin = () => {
  const ivrContext = useContext(IVRContext);
  const navigate = useNavigate();

  //store the access token in localStorage
  let getToken = (response) => {
    console.log(response);
    console.log("Type : ", Object.keys(response));
    let accessToken = response["access_token"];
    console.log("Token : ", accessToken);
    localStorage.setItem("accessToken", accessToken);
    ivrContext.loginParameters.loginStatus = true;
    alert("Login Successfull.");
    navigate("/convert");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      console.log("Google login successful", response);
      console.log("Authorization Code : ", response.code);
      // You can now use the tokenResponse to authenticate the user in your app

      //Send the authorization code to the backend
      //send Code to backend and get accessToken
      console.log("Sending the Auth code to the backend");

      ivrContext.axiosUtility(
        getToken,
        "http://localhost:8080/login/get/token",
        "POST",
        { code: response.code }
      );
    },
    onError: () => {
      console.error("Google login failed");
      // Handle login errors here
    },
    flow: "auth-code", // Use 'auth-code' for the authorization code flow
  });

  return (
    <div className="flex flex-row justify-center m-10 p-10 text-4xl items-center">
      <button
        onClick={() => googleLogin()}
        className="rounded-xl bg-white p-10 hover:bg-yellow-200 active:bg-white"
      >
        Sign in with Google 🚀
      </button>
    </div>
  );
};

export default OAuthPreLogin;

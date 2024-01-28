import React from "react";
import { useContext } from "react";
import { IVRContext } from "../Context/ContextProvider";
import { useState } from "react";

const BasicAuthPreLogin = () => {
  const ivrContext = useContext(IVRContext);

  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  let processLoginResponse = (data) => {
    console.log("After Login:", data);
    if (data != "Username not found.") {
      let temp = {
        ...ivrContext.loginParameters,
        loginStatus: true,
        username: credentials.username,
        id: data,
      };
      ivrContext.setLoginParameters(temp);
      alert("Login Successful.");
    } else {
      alert("Invalid Credentials");
    }
  };

  let processSignUpResponse = (data) => {
    console.log(data);
    let temp = { ...ivrContext.loginParameters, loginStatus: false };
    ivrContext.setLoginParameters(temp);
    setIsLogin(true);

    alert("Sign Up Successful.");

    //Empty the username and password fields
    setCredentials({ username: "", password: "" });
  };

  //Function ot either login or sign up based on the user choice
  let performAction = () => {
    if (isLogin) {
      //validate credentials for login
      ivrContext.axiosUtility(
        processLoginResponse,
        "http://localhost:8080/credentials/login",
        "POST",
        credentials
      );
    } else {
      //Register new credentials in DB
      ivrContext.axiosUtility(
        processSignUpResponse,
        "http://localhost:8080/credentials",
        "POST",
        credentials
      );
    }
  };

  let handleUsernameChange = (event) => {
    let temp = { ...credentials, username: event.target.value };
    setCredentials(temp);
  };

  let handlePasswordChange = (event) => {
    let temp = { ...credentials, password: event.target.value };
    setCredentials(temp);
  };

  return (
    <div className="text-center py-5 lg:text-3xl text-xl font-bold">
      <div>
        <div className="flex flex-row gap-x-5 justify-center items-center m-3">
          <div>Enter your username</div>
          <input
            type="text"
            placeholder="Enter Username"
            value={credentials.username}
            onChange={handleUsernameChange}
            className="p-5"
          ></input>
        </div>
        <div className="flex flex-row gap-x-5 justify-center items-center m-3">
          <div>Enter your password</div>
          <input
            type="password"
            placeholder="Enter Password"
            value={credentials.password}
            onChange={handlePasswordChange}
            className="p-5"
          ></input>
        </div>
        <div className="rounded-xl hover:text-blue-600 active:text-black">
          <button onClick={performAction}>
            {" "}
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </div>
        {isLogin ? (
          <div className="flex flex-row gap-x-10 text-xl justify-center mt-10">
            <div>Not registered?</div>
            <div>
              <button
                className="text-red-600 hover:underline"
                onClick={() => {
                  setIsLogin(false);
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default BasicAuthPreLogin;

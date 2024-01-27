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
import LoginButton from "../Components/LoginButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const ivrContext = useContext(IVRContext);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState({ state: false, value: "" });

  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  let changePassword = () => {
    //Change password state
    setNewPassword({ state: true, value: "" });
  };

  let processPasswordChange = (data) => {
    //Logout the user
    let temp = {
      ...ivrContext.loginParameters,
      loginStatus: false,
      username: "",
    };
    ivrContext.setLoginParameters(temp);

    //Navigate back to home page
    navigate("/");
  };

  let updatePassword = () => {
    //Create a payload
    let payload = {
      id: ivrContext.loginParameters.id,
      username: ivrContext.loginParameters.username,
      password: newPassword.value,
    };

    //Make an API call
    //
    // Old Code
    //
    // axios
    //   .put("http://localhost:8080/credentials", payload)
    //   .then((response) => {
    //     console.log(response.data);
    //     processPasswordChange(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    //New Code
    ivrContext.axiosUtility(
      processPasswordChange,
      "http://localhost:8080/credentials",
      "PUT",
      payload
    );
  };

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
      //
      // Old Code
      //
      // axios
      //   .post("http://localhost:8080/credentials/login", credentials)
      //   .then((response) => {
      //     console.log("After Login:", response.data);
      //     if (response.data != "Username not found.") {
      //       let temp = {
      //         ...ivrContext.loginParameters,
      //         loginStatus: true,
      //         username: credentials.username,
      //         id: response.data,
      //       };
      //       ivrContext.setLoginParameters(temp);
      //       alert("Login Successful.");
      //     } else {
      //       alert("Invalid Credentials");
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      //New Code
      ivrContext.axiosUtility(
        processLoginResponse,
        "http://localhost:8080/credentials/login",
        "POST",
        credentials
      );
    } //saved new username and password in DB, and login again
    else {
      //
      // Old Code
      //
      // axios
      //   .post("http://localhost:8080/credentials", credentials)
      //   .then((response) => {
      //     console.log(response.data);
      //     let temp = { ...ivrContext.loginParameters, loginStatus: false };
      //     ivrContext.setLoginParameters(temp);
      //     setIsLogin(true);

      //     alert("Sign Up Successful.");

      //     //Empty the username and password fields
      //     setCredentials({ username: "", password: "" });
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     let temp = { ...ivrContext.loginParameters, loginStatus: false };
      //     ivrContext.setLoginParameters(temp);
      //     setIsLogin(false);
      //   });

      //New Code
      ivrContext.axiosUtility(
        processSignUpResponse,
        "http://localhost:8080/credentials",
        "POST",
        credentials
      );
    }
  };

  let handleNewPasswordChange = (event) => {
    let temp = { ...newPassword, value: event.target.value };
    setNewPassword(temp);
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
    <div className="bg-blue-200 min-w-screen p-5 border-black border-2 rounded-xl">
      {ivrContext.loginParameters.loginStatus ? (
        <div className="flex flex-col gap-5">
          <LoginButton
            onClick={() => {
              let temp = { ...ivrContext.loginParameters, loginStatus: false };
              ivrContext.setLoginParameters(temp);
              navigate("/");
            }}
          >
            Logout
          </LoginButton>
          <LoginButton onClick={changePassword}>Change Password</LoginButton>
          {newPassword.state ? (
            <div>
              <div className="flex fle-row gap-x-10 justify-center text-2xl items-center">
                Enter the new password
                <input
                  className="p-5"
                  type="password"
                  placeholder="Enter the new password"
                  value={newPassword.value}
                  onChange={handleNewPasswordChange}
                ></input>
              </div>
              <div className="text-center text-3xl mt-10">
                <button onClick={updatePassword}>Submit</button>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Login;

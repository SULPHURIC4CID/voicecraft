import React from "react";
import LoginButton from "./LoginButton";
import { useContext } from "react";
import { IVRContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BasicAuthPostLogin = () => {
  const ivrContext = useContext(IVRContext);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState({ state: false, value: "" });
  let handleNewPasswordChange = (event) => {
    let temp = { ...newPassword, value: event.target.value };
    setNewPassword(temp);
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

  let changePassword = () => {
    //Change password state
    setNewPassword({ state: true, value: "" });
  };

  let updatePassword = () => {
    //Create a payload
    let payload = {
      id: ivrContext.loginParameters.id,
      username: ivrContext.loginParameters.username,
      password: newPassword.value,
    };

    //Make an API call
    ivrContext.axiosUtility(
      processPasswordChange,
      "http://localhost:8080/credentials",
      "PUT",
      payload
    );
  };

  return (
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
  );
};

export default BasicAuthPostLogin;

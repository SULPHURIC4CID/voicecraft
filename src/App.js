/*
  App.jsx
  Author: Anantha Narayanan
  Created: 14-01-2024
  Last Modified: 16-01-2024
  Project: Text to Voice

  This file comprises of the Navigation Bar and the PAge to be subsequently rendered based on the url.
*/

import React from "react";
import Home from "./Pages/Home";
import Convert from "./Pages/Convert";
import Login from "./Pages/Login";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import ContextProvider from "./Context/ContextProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const navigate = useNavigate();

  //This is because the code is also hosted on GitHub with a different root address, so forcing to load home page
  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <GoogleOAuthProvider clientId="831061238928-0ht7vfarq5fkig9045daljdp03me6cbr.apps.googleusercontent.com">
      <div
        className="bg-cover"
        style={{
          backgroundImage: 'url("./text-to-voice/blue_background.jpg")',
        }}
      >
        {/* Scope of the IVR Context */}
        {/* Central Navigation Bar + Page depending on URL */}
        <ContextProvider>
          <NavigationBar />
          <div className="lg:py-12 lg:px-36 p-5 min-h-screen">
            <Routes>
              <Route path="/convert" element={<Convert />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </ContextProvider>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;

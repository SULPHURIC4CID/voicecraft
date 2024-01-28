# Skyvera Hackthon : text-to-voice

This project is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

Make sure Node JS is installed on the system.
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

To get started with the project, follow these steps:

1. Run `npm install` to install the dependencies.
2. Run `npm start` to start the development server.

# External dependencies installed
    axios: for making API calls
    react-router-dom: for page routing functionality
    react-icons: for custom icons (download Button)

This project has the following code base structure

1. package.json - is a file used in Node.js projects to define the project's metadata and dependencies. It includes information such as the project's name, version, entry point, scripts, and dependencies. It is commonly used for managing Node.js packages and scripts.
2. src folder - Comprises of all the source code files used to build this project.
3. public folder - Comprises of all the files used in this project (images, audio files etc) that are publically accesible.


Structure of src folder

The source folder comprises of the following important files

1. index.js - This is the .js file that is first executed when running the project.
2. App.js - By convention, the contents of App.js are rendered when index.js is executed.
3. Components folder -
    This folder consists of all the individual components used to create the react application.
    In this project the following components are used.
        Configuration.jsx - This files is used to generate and display the various voice cofiguration settings (Stability, Clarity, Style and Speaker Boost).
        InputBlock.jsx - This file is used to generate and display the possible input types (Text,URL and File radio buttons).
        InputDetails.jsx - This file is used to generate and display the user input field once the type of input is selected.
        NavigationBar.jsx - This file is used to create the header/navigationbar comprising of the title, subttitle and various navigation options(Home, Convert and Login for now).
        NavigationButton.jsx - This file is used to build a custom button that will be used within the NavigationBar.
        VoiceDetails.jsx - This file is used to generate the individual buttons with the voice details associated with a single voice option(example details about Zoe).
4. Context folder -
    This folder consists of the various states used in the react application.
    ContextProvider.jsx - This file conssits of all the states bundled into a single Context that can be used throught the scope of the ContextProvider.
5. Pages folder -
    This folder comprises of the various pages that need to be displayd based on the url provided by user or while internal routing.
    Home.jsx - This file used to render the home page (empty for now).
    Convert.jsx - This file used to render the text-to-voice conversion settings.
    Login.jsx - This fiel is used to render the login page (empty for now).

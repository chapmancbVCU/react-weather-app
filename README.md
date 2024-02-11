# React Weather App

React version of my weather app that is based on TypeScript.  It utilizes a Node.JS server that I use to protect my API key from being exposed to the public.  The way the application works is it contacts my Node.JS server with a request with information about the location whose forecast I want to view.  The server performs the request to Open Weather Map and then fulfills the original request with weather data.

Still a work in progress, it currently supports the ability to switch between metric and imperial units.  The settings are consistent between pages through the use of hooks and state props.  The search feature is partially functional.  Currently, we can type in a location and suggested location names will appear.  The user can click on the location to select it and then press the Search button to update the page's content.

## System Requirements
1. npm Package manager
2. Node.JS
3. Installation of my weather-api-server to protect the API key.  Code and instructions can be found here: https://github.com/chapmancbVCU/weather-api-server

## Setup
1. Clone the weather-api-server
2. cd into directory and run "npm install".  Additional resources can be found at the link for this project.
3. Run the command "npm start"
4. cd.. out of this directory and clone this project
5. cd into directory for this project and run "npm install"
6. Rename the .env.sample file to .env and set your ip address or hostname to that of the Node.JS weather-api-server project.
7. Run the command "npm run dev" or "npm run dev -- --host" if you are accessing the site from another computer.
8. Navigate to the site ${hostname/ip_address}:5173/react-weather-app

Link to live site: https://chapmancbvcu.github.io/react-weather-app/
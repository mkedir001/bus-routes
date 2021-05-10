import React, { useState, useEffect } from 'react';
import DropDownMenu from './Components/DropDownMenu/DropDown';
import getRoutes from './api/routesApi';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Header from './Components/Header/header';
import Footer from './Components/Footer/footer';
import './App.css';

//this page is need of refactor. primarily the api calls should be in a seperate folder, with the helping function calls in 'helpers' folder

function App() {
  const [routes, setRoutes] = useState("")
  const [routeList, setRouteList] = useState("")
  const [directionList, setDirectionList] = useState("")
  const [selectedRoute, setSelectedRoute] = useState("")
  const [selectedDirection, setSelectedDirection] = useState("")
  const [allDirections, setAllDirections] = useState("")
  const [stops, setStops] = useState([])

  async function getRoutes() {
    const routes = await fetch("https://svc.metrotransit.org/nextripv2/routes");
    const routesData = await routes.json()
    await displayRoutes(routesData)
    setRoutes(routesData)
  }

  async function getDirections() {
    const directions = await fetch(`https://svc.metrotransit.org/nextripv2/directions/${routes[0].route_id}`);
    const directionsData = await directions.json();
    setAllDirections(directionsData)
    const directionList = await displayDirections(directionsData)
  }

  useEffect(getRoutes, [])

  const displayRoutes = (routes) => {
    const routNames = routes.map(route => route.route_label);
    setRouteList(routNames)
    return routNames;
  }
  const displayDirections = (directions) => {
    const directionNames = directions.map(direction => direction.direction_name);
    setDirectionList(directionNames)
    setSelectedDirection(directionNames[0], [])
    return directionNames;
  }


  async function getStops() {
    if (!selectedRoute) {
      alert('Please select a route to continue')
    }
    else {
      const currentRoute = routes.find(element => element.route_label === selectedRoute);
      const currentDirection = allDirections.find(element => element.direction_name === selectedDirection);
      const busStops = await fetch(`https://svc.metrotransit.org/nextripv2/stops/${currentRoute.route_id}/${currentDirection.direction_id}`);
      const results = await busStops.json()
      setStops(results)
    }
  }

  const updateSelectedRoute = (e) => {
    getDirections()
    setSelectedRoute(e.value, [])
  }
  const updateSelectedDirection = (e) => {
    setSelectedDirection(e.value, [])
  }

  return (
    <div className="App">
      <Header />
      <div className='drop-down-menu'>
        <Dropdown className="drop-down" options={routeList} onChange={updateSelectedRoute} value={'Select Route'} placeholder="Select an option" />
        <button id="find-stops" onClick={getStops}>Find Stops</button>
        <Dropdown disabled={directionList ? false : true} className="drop-down" options={directionList} onChange={updateSelectedDirection} value={directionList ? directionList[0] : 'Select Direction'} placeholder="Select an option" />
      </div>
      <div className='results-field'>
        <ul>
          {stops && stops.map(stop => {
            return <li id="stop-description">{stop.description}</li>
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;

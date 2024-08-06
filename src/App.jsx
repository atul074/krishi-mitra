import { useState } from 'react'
import reactLogo from './assets/react.svg'

//import './App.css'
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import Home from "./pages/Home"
import NoPage from './pages/NoPage';
import Productinfo from './pages/Productinfo';
import ScrollTop from './components/Scrolltop';
import Mylist from './pages/Mylist';
import Explore from './pages/Explore';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Additem from './pages/Additem';
import Categorypage from './pages/Categorypage';
import Mystate from './context/Mystate';
import { Protectedroute } from './context/Protectedroute';
import React from 'react';
function App() {
  

  return (
    <Mystate>
      <Router>
        <ScrollTop/>
        <Routes>
          <Route path="/" element={ <Protectedroute> <Home/> </Protectedroute>} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/productinfo/:id" element={< Productinfo/>} />
          <Route path="/list" element={<Mylist/>} />
          <Route path="/explore" element={<Explore/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/category/:categoryname" element={<Categorypage />} /> 
          <Route path="/additem" element={  <Protectedroute><Additem/> </Protectedroute>} />
        </Routes>
      </Router>
    </Mystate>
  )
}

export default App

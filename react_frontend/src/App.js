import './App.css';
import React  from 'react'
//import {Routes, Route } from 'react-router-dom';
import  Wager from './wager.js';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home } from './home';
import Game from './game';
import Loss from './loss';
import Win from './win'


class App extends React.Component {
render()   {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/win" element={<Win />} />
          <Route path="/loss" element={<Loss />} />
        </Routes>
    </BrowserRouter>
  );
}
}
export default App;

//        



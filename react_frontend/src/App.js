import './App.css';
import React  from 'react'
//import {Routes, Route } from 'react-router-dom';
import  Wager from './wager.js';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home } from './home';
import Game from './game';


class App extends React.Component {
render()   {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
    </BrowserRouter>
  );
}
}
export default App;

//        <Wagerform />
//        <button onClick={Wager}>New Game</button>
//          <Route path="/wager" element={<Wager />} />



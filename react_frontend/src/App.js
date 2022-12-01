import './App.css';
import React  from 'react'
//import {Routes, Route } from 'react-router-dom';
import { Wager } from './wager.js';


class App extends React.Component {
render()   {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={Wager}>New Game</button>
      </header>
      <div id="Wager"></div>

    </div>
  );
}
}
export default App;

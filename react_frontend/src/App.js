import './App.css';
import React  from 'react'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home } from './home';
import Game from './game';
import { Broke } from './broke';



class App extends React.Component {
render()   {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/broke" element={<Broke />} />
        </Routes>
    </BrowserRouter>
  );
}
}
export default App;

//        



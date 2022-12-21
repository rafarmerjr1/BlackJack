import './App.css';
import React  from 'react'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Game from './game';
import { ErrorPage } from './404'

// Need to move error handling to this page.

class App extends React.Component {
render()   {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path='*' element={<ErrorPage />}/>
        </Routes>
    </BrowserRouter>
  );
}
}
export default App;



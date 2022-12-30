import './App.css';
import React from 'react';
import { fetchClear } from './callAPI';

export function Home(props) {

  const NewGame = () => {
    // Use fetchClear() instead of resetGame() to avoid modifying state unnecessarily 
    fetchClear() 
    props.startNewGame()
    props.getBalance()
};
    return (
      <React.Fragment>
        <div>        
            <button onClick={NewGame}> 
             <img className="home-Image" src={require('./images/titlecard.png')} alt="homeImage"/> 
            </button>
        </div>
      </React.Fragment>
    )
}


//        <div className="center-content">        

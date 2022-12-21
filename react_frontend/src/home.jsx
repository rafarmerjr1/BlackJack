import './App.css';
import React from 'react';
import { fetchClear } from './callAPI';

export function Home(props) {

  const NewGame = () => {
    // Use fetchClear instead of resetGame to avoid modifying state
    fetchClear() 
    //props.resetGame()
    props.startNewGame()
    props.getBalance()
};
    return (
      <React.Fragment>
        <div className="home">        
            <button onClick={NewGame}> 
             <img className="home-Image" src={require('./images/blackjack.png')} alt="homeImage"/> 
            </button>
        </div>
      </React.Fragment>
    )
}

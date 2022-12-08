import './App.css';
import React from 'react'

export function Broke(props) {
    return(
        <div className="home">        
            <button onClick={props.newGame}> 
             <img className="home-Image" src={require('./images/blackjack.png')}/> 
            </button>
            
            
            <h1 className="fade-in-image section" ><span className="outcome_color">Whoa Parter - </span> You're all out of money.</h1>
            <h4>Maybe you should try starting a new game.</h4>
        </div>
    )
}

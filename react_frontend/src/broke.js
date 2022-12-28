import './App.css';
import React from 'react'

// This page is returned upon invalid input, when a player is out of money, or when a wager exceeds player balance
export function Broke(props) {
    // reset values and redirect user to start a new game:
    const GoHome = () => {
        props.resetGame()
    }
    return(
        <div className="home">        
            <button onClick={GoHome}> 
             <img className="home-Image" src={require('./images/titlecard.png')} alt="homeImage"/> 
            </button>
            <h1 className="fade-in-image section" ><span className="outcome_color">Whoa Parter - </span> You're all out of money.</h1>
            <h4>Maybe you should try starting a new game.</h4>
        </div>
    )
}

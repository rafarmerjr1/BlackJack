import './App.css';
import React from 'react'
import { useNavigate } from 'react-router-dom';

// This page is returned upon invalid input, when a player is out of money, or when a wager exceeds player balance

export function Broke(props) {
    const navigate = useNavigate();

    // reset values and redirect to home
    const GoHome = () => {
        props.resetGame()
        navigate("/", {replace: true});
    }
    return(
        <div className="home">        
            
            <button onClick={GoHome}> 
             <img className="home-Image" src={require('./images/blackjack.png')}/> 
            </button>

            <h1 className="fade-in-image section" ><span className="outcome_color">Whoa Parter - </span> You're all out of money.</h1>
            <h4>Maybe you should try starting a new game.</h4>
        </div>
    )
}

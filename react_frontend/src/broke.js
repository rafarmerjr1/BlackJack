import './App.css';
import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { fetchClear } from './callAPI';

export function Broke(props) {
    const navigate = useNavigate();

    const GoHome = () => {
        props.resetGame()
        navigate("/", {replace: true});
    }

    const clear = () => {
        fetchClear()
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

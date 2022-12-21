import './App.css';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchClear } from './callAPI';


// 404 page
export function ErrorPage(props) {
    const navigate = useNavigate();

    const GoHome = () => {
        //clear everything and redirect to home page
        fetchClear()
        navigate("/", {replace: true});
    }
    return(
        <div className="dark app" id="top">

        <div className="home">        
            <button onClick={GoHome}> 
             <img className="home-Image" src={require('./images/blackjack.png')} alt="homeImage"/> 
            </button>
            <h1>404</h1>
            <h2 className="fade-in-image section" ><span className="outcome_color">Something's Wrong - </span> I'm not sure what it is...</h2>
            <h4>Maybe you should try starting a new game.</h4>
        </div>
        </div>
    )
}

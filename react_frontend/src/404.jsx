import './App.css';
import React from 'react'
import { Link } from 'react-router-dom';

// 404 page

export function ErrorPage() {

    return(
        <div className="dark app" id="top">

        <div className="home">        
            <Link to={'/'}> 
                <img className="home-Image" src={require('./images/blackjack.png')} alt="homeImage"/>
            </Link>
            <h1>404</h1>
            <h2 className="fade-in-image section" ><span className="outcome_color">Something's Wrong - </span> I'm not sure what it is...</h2>
            <h4>Maybe you should try starting a new game.</h4>
        </div>
        </div>
    )
}

import { Link } from 'react-router-dom';
import './App.css';
import React from 'react';

// Landing Page.
export function Home() {
    
    return (
        <div className="dark app" id="top">
          <main>
          <header className="header center"> 
            <p>Let's Play Blackjack!</p>
            <a className="link" href="https://github.com/rafarmerjr1/BlackJack">
                https://github.com/rafarmerjr1/BlackJack
                </a>
          </header>
  
    <div className="home">        
        <Link to={'/game'}> 
        <img className="home-Image" src={require('./images/blackjack.png')} alt="homeImage"/>
        </Link>
        </div>

      </main>
    </div>
    )
}


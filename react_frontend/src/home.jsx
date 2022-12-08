import { Link } from 'react-router-dom';
import './App.css';
import React from 'react';

export function Home(props) {

    return (
        <div className="dark app" id="top">
          <main>
          <header className="header center"> 
            <div className="about center">
            <p>Let's Play <span className="about__name">Blackjack!</span></p>
            </div>
            </header>
  
            <div className="home">        
        <Link to={'/game'}> <img className="home-Image" src={require('./images/blackjack.png')}/></Link>
        </div>

      </main>
    </div>
    )
}

// Can we trigger a new game with something like: onClick={Game.getNewGame()}
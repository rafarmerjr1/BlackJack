import { Link } from 'react-router-dom';
import './App.css';
import React from 'react';
import Game from './game'


export function Home() {
    
    return (
        <div className="dark app" id="top">
          <main>
          <header className="header center"> 
            <div className="about center">
            <p>Let's Play <span className="about__name">Blackjack!</span></p>
            </div>
            </header>
  
            <div className="home">        
        <Link to={'/game'}> 
        {/* <span onClick={getFirstHand}> <img className="home-Image" src={require('./images/blackjack.png')}/> </span> */}
        <img className="home-Image" src={require('./images/blackjack.png')}/>
        </Link>
        </div>

      </main>
    </div>
    )
}

/* 
const getFirstHand = () => {
  new Game().getNewGame();
}

*/
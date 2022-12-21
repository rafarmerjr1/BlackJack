import './App.css';
import React from 'react'


// 404 page
export function ErrorPage(props) {
    const NewGame = () => {
        props.resetGame() 
    }
    return(
        <React.Fragment>
        <div className="home">        
            <button onClick={NewGame}> 
             <img className="home-Image" src={require('./images/blackjack.png')} alt="homeImage"/> 
            </button>
            <h1>404</h1>
            <h2 className="fade-in-image section" ><span className="outcome_color">Something's Wrong - </span> I'm not sure what it is...</h2>
            <h4>Maybe you should try starting a new game.</h4>
        </div>
        </React.Fragment>
    )
}

import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';


export function Win(props) {
    return (
        <React.Fragment>
        <div className="section__title">
        <h1>You <span className="about__name">Win!</span></h1>
        </div>

        <h4 className="section__title">Want to play again?</h4>
        <button className="btn btn--outline" onClick={props.cont}>Keep Playing</button>
        <p>Your Balance: <span className="score">${props.state.balance}</span></p>
       
       
        <h4 className="section section__title">Dealer Final Score: <span className="losing_score">{props.state.dealer_score}</span></h4>
    <div className="App-image-body">
        {props.state.dealer_imgs.map((cardImage) => 
        <img className="App-image-static" src={require(`./${cardImage}`)} />)}
    </div>

        <h4 className="section section__title">Your Final Score: <span className="score">{props.state.player_score}</span></h4>
    <div className="App-image-body">
        {props.state.player_imgs.map((cardImage) => 
        <img className="App-image-static" src={require(`./${cardImage}`)} />)}
    </div>
        <Link to={'/'} className="link about__role"> New Game</Link>
        <p>Balance will Reset with new game.</p>
        </React.Fragment>
    );
};

export default Win;

import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';


export function Win(props) {
    return (
        <React.Fragment>
        <h1>You Win!</h1>
        <p>Want to play again?</p>
        <button className="btn" onClick={props.cont}>Keep Playing</button>
        <p>Your Balance: ${props.state.balance}</p>
        <p>Dealer Final Score: {props.state.dealer_score}</p>
    <div className="App-image-body">
        {props.state.dealer_imgs.map((cardImage) => 
        <img className="App-image" src={require(`./${cardImage}`)} />)}
    </div>

        <p>Your Final Score: {props.state.player_score}</p>
    <div className="App-image-body">
        {props.state.player_imgs.map((cardImage) => 
        <img className="App-image" src={require(`./${cardImage}`)} />)}
    </div>
        <Link to={'/'}> New Game</Link>
        </React.Fragment>
    );
};

export default Win;

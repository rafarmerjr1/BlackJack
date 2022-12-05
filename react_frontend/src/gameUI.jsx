import './App.css';
import React, { useEffect, Link } from 'react'


export function GameUI(props){
    return(
    <React.Fragment>
    <h3>Dealer Hand</h3>
    <div className="App-image-body">
        {props.state.dealer_imgs.map((cardImage) => 
        <img className="App-image" src={require(`./${cardImage}`)} />)}
    </div>
        
    <h3>Player Hand</h3>
    <div className="App-image-body">
        {props.state.player_imgs.map((cardImage) => 
        <img className="App-image" src={require(`./${cardImage}`)} />)}
    </div>

        <p>Player Score: {props.state.player_score}</p>
         
        <button className="btn" onClick={props.handleHit}> Hit </button>
        <button className="btn" onClick={props.handleStand}> Stand </button>
    </React.Fragment>
    );
};

/*

<GameUI state={this.state} handleHit={this.handleHit} handleStand={this.handleStand} />

*/
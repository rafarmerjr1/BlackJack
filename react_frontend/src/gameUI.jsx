import './App.css';
import React, { useEffect, Link } from 'react'
import { Win } from './win'
import { Loss } from './loss';
import { Tie } from './tie';
import { BlackJack } from './blackjack';




export function GameUI(props){
    return(
    <React.Fragment>
    <div className="section__title">
    <h3>Dealer Hand</h3>
        {props.state.dealer_imgs.map((cardImage) => 
        <img className="App-image" src={require(`./${cardImage}`)} />)}
    </div>
    <div className="section section__title">
    <h3>Player Hand</h3>
        {props.state.player_imgs.map((cardImage) => 
            <img className="App-image"src={require(`./${cardImage}`)} />)}
        
    </div>
    <div className="section section__title">
        <h3>Player Score: <span className="score">{props.state.player_score}</span></h3>
    </div> 
        <button className="btn btn--outline" onClick={props.handleHit}> Hit </button>
        <button className="btn btn--outline" onClick={props.handleStand}> Stand </button>
    </React.Fragment>
    );
};

/*

<GameUI state={this.state} handleHit={this.handleHit} handleStand={this.handleStand} />
*/
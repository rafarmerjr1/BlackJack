import './App.css';
import React from 'react'
import { Win, Loss, Tie, Blackjack } from './outcomes'
import { PlayerLoseScore, PlayerWinScore, DealerLoseScore, DealerWinScore } from './scores';

// Main Gameplay component



// Ask player if they want to hit or stand
function HitstandOpts(props) {

    const sendButton = (action) => {
        props.handleAction(action)
    }

    return (
        <React.Fragment>
        <button className="btn btn--outline" onClick={() => sendButton("hit")}> Hit </button>
        <button className="btn btn--outline" onClick={() => sendButton("stand")}> Stand </button>
        </React.Fragment>
    );
};

// Keep dealer score hidden until after end of hand
function DealerScore(){
    return(
        <React.Fragment>
        
        <h3 className="score">x</h3>
        </React.Fragment>
    )
};

// Present player score
function PlayerScore(props){
    return (
        <React.Fragment>
            
            <h3 className="score">{props.state.player_score}</h3>
        </React.Fragment>
    )
};

// post-hand functionality - allow continuing with same wager or changing wager
function EndButtons(props){

    const keepOrChangeWager = (bet) => {
        props.determineWager(bet)
    }

    return(
        <React.Fragment>
            <div className="fade-in-image" >
            <button className="btn btn--outline" onClick={() => keepOrChangeWager("change")}> change Wager </button>
            <button className="btn btn--outline" onClick={() => keepOrChangeWager("keep")}> Wager ${props.state.wager} </button>
            <p>Your Balance: <span className="end_balance"> ${props.state.balance} </span></p>
            </div>
        </React.Fragment>
    )
};

export function GameUI(props){

    let playerActions = null
    let dealerScore = <DealerScore />
    let banner = null
    let playerScore = null
    
    // Check results to see which outcome to display:
    switch(props.state.results){
    case "loss":
        playerActions = <EndButtons state={props.state} determineWager={props.determineWager} />
        banner = <Loss/>
        playerScore = <PlayerLoseScore state={props.state} />
        dealerScore = <DealerWinScore state={props.state} />
        break;
    case "win":
        banner = <Win/>    
        playerActions = <EndButtons state={props.state} determineWager={props.determineWager}/>
        playerScore = <PlayerWinScore state={props.state} />
        dealerScore = <DealerLoseScore state={props.state} />
        break;
    case "tie":
        banner = <Tie/>
        playerActions = <EndButtons state={props.state} determineWager={props.determineWager}/>
        playerScore = <PlayerWinScore state={props.state} />
        dealerScore = <DealerWinScore state={props.state} />
        break;
    case "blackjack":
        banner = <Blackjack/>
        playerActions = <EndButtons state={props.state} determineWager={props.determineWager}/>
        playerScore = <PlayerWinScore state={props.state} />
        dealerScore = <DealerLoseScore state={props.state} />
        break;
    default:  //"continue":
        playerActions = <HitstandOpts handleAction={props.handleAction} />
        playerScore = <PlayerScore state={props.state}/>
        break;
    }

    return(
    <React.Fragment>
    <div className="banner">
        {banner}
    </div>
    <h3 className="hand">Dealer Hand</h3>
        {props.state.dealer_imgs.map((cardImage) => 
        <img className="App-image" src={require(`./${cardImage}`)} />)}
        {dealerScore}

    <h3 className="hand">Player Hand</h3>
        {props.state.player_imgs.map((cardImage) => 
            <img className="App-image-player" src={require(`./${cardImage}`)} />)}
        
        {playerScore}
        {playerActions}
    </React.Fragment>
    );
};

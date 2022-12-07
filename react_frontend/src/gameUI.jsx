import './App.css';
import React from 'react'
import { Win, Loss, Tie, Blackjack } from './outcomes'
import { PlayerLoseScore, PlayerWinScore, DealerLoseScore, DealerWinScore } from './scores';
import { Link } from 'react-router-dom';

function HitstandOpts(props) {
    return (
        <React.Fragment>
        <button className="btn btn--outline" onClick={props.handleHit}> Hit </button>
        <button className="btn btn--outline" onClick={props.handleStand}> Stand </button>
        </React.Fragment>
    );
};

function Banner(){
    return (
    <React.Fragment>
        <h1 style={{"color":"var(--yellow)"}}>Current Hand:</h1>
    </React.Fragment>
    );
};

function DealerScore(){
    return(
        <React.Fragment>
        
        <h3 className="score">x</h3>
        </React.Fragment>
    )
};

function PlayerScore(props){
    return (
        <React.Fragment>
            
            <h3 className="score">{props.state.player_score}</h3>
        </React.Fragment>
    )
};

function EndButtons(props){
    return(
        <React.Fragment>
            <div className="fade-in-image" >
            
            <button className="btn btn--outline" onClick={props.continuePlaying}> change Wager </button>
            <button className="btn btn--outline" onClick={props.contSame}> Wager ${props.state.wager} </button>
            <p>Your Balance: <span className="end_balance"> ${props.state.balance} </span></p>
            </div>
        </React.Fragment>
    )
};

export function GameUI(props){

    let stand = null
    let playerActions = null
    let dealerScore = <DealerScore />
    let banner = null
    let playerScore = null
    //let updatedState = props.getState()

    if (props.state.results === "continue") {
        
        playerActions = <HitstandOpts handleHit={props.handleHit} handleStand={props.handleStand} />
        playerScore = <PlayerScore state={props.state}/>
    }
    else if (props.state.results === "loss"){  
        //updatedState = props.getState();           
        playerActions = <EndButtons continuePlaying={props.cont} contSame={props.contWag} state={props.state}/>
        banner = <Loss/>
        playerScore = <PlayerLoseScore state={props.state} />
        dealerScore = <DealerWinScore state={props.state} />
    } 
    // win
    else if (props.state.results === "win"){     
        banner = <Win/>    
        playerActions = <EndButtons continuePlaying={props.cont} contSame={props.contWag} state={props.state}/>
        playerScore = <PlayerWinScore state={props.state} />
        dealerScore = <DealerLoseScore state={props.state} />
    }
    // Tie
    else if (props.state.results === "tie"){
        banner = <Tie/>
        playerActions = <EndButtons continuePlaying={props.cont} contSame={props.contWag} state={props.state}/>
        playerScore = <PlayerWinScore state={props.state} />
        dealerScore = <DealerWinScore state={props.state} />
    }
    // BlackJack hand
    else if (props.state.results === "blackjack"){
        banner = <Blackjack/>
        playerActions = <EndButtons continuePlaying={props.cont} contSame={props.contWag} state={props.state}/>
        playerScore = <PlayerWinScore state={props.state} />
        dealerScore = <DealerLoseScore state={props.state} />
    };


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

/*

<GameUI state={props.state} handleHit={props.handleHit} handleStand={props.handleStand} />
*/
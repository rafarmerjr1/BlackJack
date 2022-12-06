import './App.css';
import React from 'react'
import { Win, Loss, Tie, Blackjack } from './outcomes'
//import { Loss, LossButtons } from './loss';
//import { Tie } from './tie';
//import { Blackjack } from './blackjack';
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
        <h1>Current Hand:</h1>
    </React.Fragment>
    );
};

function DealerScore(){
    return(
        <React.Fragment>
        <h3>Dealer Score: <span className="score">x</span></h3>
        </React.Fragment>
    )
};

function PlayerScore(props){
    return (
        <React.Fragment>
            <h3>Player Score: <span className="score">{props.state.player_score}</span></h3>
        </React.Fragment>
    )
};

function EndButtons(props){
    return(
        <React.Fragment>
            <h4 className="section__title">Want to play again?</h4>
            <button className="btn btn--outline" onClick={props.continuePlaying}> Keep Playing </button>
            <p>Your Balance: <span className="end_balance"> $ {props.state.balance} </span></p>

            <Link to={'/'} className="link about__role"> New Game</Link>
        <p>Balance will Reset with new game.</p>
        </React.Fragment>
    )
};

export function GameUI(props){

    let stand = null
    let playerActions = null
    let dealerScore = <DealerScore />
    let banner = <Banner />
    let playerScore = null
    //let updatedState = props.getState()

    if (props.state.results === "continue") {
        banner = <Banner />
        playerActions = <HitstandOpts handleHit={props.handleHit} handleStand={props.handleStand} />
        playerScore = <PlayerScore state={props.state}/>
    }
    else if (props.state.results === "loss"){  
        //updatedState = props.getState();           
        playerActions = <EndButtons continuePlaying={props.cont} state={props.state}/>
        banner = <Loss/>
        playerScore = <PlayerLoseScore state={props.state} />
        dealerScore = <DealerWinScore state={props.state} />
    } 
    // win
    else if (props.state.results === "win"){     
        banner = <Win/>    
        playerActions = <EndButtons continuePlaying={props.cont} state={props.state}/>
        playerScore = <PlayerWinScore state={props.state} />
        dealerScore = <DealerLoseScore state={props.state} />
    }
    // Tie
    else if (props.state.results === "tie"){
        banner = <Tie/>
        playerActions = <EndButtons continuePlaying={props.cont} state={props.state}/>
        playerScore = <PlayerWinScore state={props.state} />
        dealerScore = <DealerWinScore state={props.state} />
    }
    // BlackJack hand
    else if (props.state.results === "blackjack"){
        banner = <Blackjack/>
        playerActions = <EndButtons continuePlaying={props.cont} state={props.state}/>
        playerScore = <PlayerWinScore state={props.state} />
        dealerScore = <DealerLoseScore state={props.state} />
    };


    return(
    <React.Fragment>
    <div className="section__title">
        {banner}
    <h3>Dealer Hand</h3>
        {props.state.dealer_imgs.map((cardImage) => 
        <img className="App-image" src={require(`./${cardImage}`)} />)}
    </div>
    <div className="section section__title">
        {dealerScore}
    </div> 

    <div className="section section__title">
    <h3>Player Hand</h3>
        {props.state.player_imgs.map((cardImage) => 
            <img className="App-image"src={require(`./${cardImage}`)} />)}
        
    </div>
    <div className="section section__title">
        {playerScore}
    </div> 
        {playerActions}
    </React.Fragment>
    );
};

/*

<GameUI state={props.state} handleHit={props.handleHit} handleStand={props.handleStand} />
*/
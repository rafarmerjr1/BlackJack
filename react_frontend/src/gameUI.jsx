import './App.css';
import React, { useState, useEffect } from 'react'
import { Win, Loss, Tie, Blackjack, Continue } from './outcomes'
import { PlayerLoseScore, PlayerWinScore, DealerLoseScore, DealerWinScore } from './scores';


export function GameUI(props){
    const [count, setCount] = useState(2);
    let playerActions = null
    let dealerScore = <DealerScore />
    let banner = null
    let playerScore = null

// Display dealer hits one array item at a time
    useEffect(() => {
        let counter = count;
        const interval = setInterval(() => {
            if (counter >= props.dealer_imgs.length) {
                clearInterval(interval);
            } else {
                setCount(count => count + 1);
                counter++;}
        }, 700);
        return () => clearInterval(interval); 
      }, [props.dealer_imgs, count]);
    
        // First two cards in dealer deck
        let StaticCards = props.dealer_imgs.slice(0, 1).map((cardImage, index) => {
        return(
            <img className="App-image" key={index} alt="" src={require(`./${cardImage}`)} /> )}
        );

        // all cards beyond the first two dealer cards
        let CardList = props.dealer_imgs.slice(1, count).map((cardImage, index) => {
        return(
            <img className="App-image" key={index} alt="" src={require(`./${cardImage}`)} /> )}
        );

// Ask player if they want to hit or stand
    function HitstandOpts() {
        const sendButton = (action) => {
            setCount(2)
            props.handleAction(action)
        }
        return (
            <React.Fragment>
            <div>
            <button className="btn btn--outline" onClick={() => sendButton("hit")}> Hit </button>
            <button className="btn btn--outline" onClick={() => sendButton("stand")}> Stand </button>
            </div>
            </React.Fragment>
        );
    };
// Keep dealer score hidden until after end of hand
    function DealerScore(){
        return(
            <React.Fragment>
            <h3 className="score">&nbsp;</h3>
            </React.Fragment>
        )
    };
// Present player score
    function PlayerScore(){
        return (
            <React.Fragment>
                <h3 className="score">{props.player_score}</h3>
            </React.Fragment>
        )
    };
// post-hand functionality - allow continuing with same wager or changing wager
    function EndButtons(){
        const keepOrChangeWager = (bet) => {
            props.determineWager(bet)
        }
        return(
            <React.Fragment>
               <div>
                <button className="btn btn--outline" onClick={() => keepOrChangeWager("change")}> change Wager </button>
                <button className="btn btn--outline" onClick={() => keepOrChangeWager("keep")}> Wager ${props.wager} </button>
                </div>
            </React.Fragment>
        )
    };

    // Check results to see which outcome to display:
    switch(props.results){
    case "loss":
        playerActions = <EndButtons wager={props.wager} determineWager={props.determineWager} />
        banner = <Loss/>
        playerScore = <PlayerLoseScore player_score={props.player_score} />
        dealerScore = <DealerWinScore dealer_score={props.dealer_score} />
        break;
    case "win":
        banner = <Win/>    
        playerActions = <EndButtons wager={props.wager} determineWager={props.determineWager}/>
        playerScore = <PlayerWinScore player_score={props.player_score} />
        dealerScore = <DealerLoseScore dealer_score={props.dealer_score} />
        break;
    case "tie":
        banner = <Tie/>
        playerActions = <EndButtons wager={props.wager} determineWager={props.determineWager}/>
        playerScore = <PlayerWinScore player_score={props.player_score} />
        dealerScore = <DealerWinScore dealer_score={props.dealer_score} />
        break;
    case "blackjack":
        banner = <Blackjack/>
        playerActions = <EndButtons wager={props.wager} determineWager={props.determineWager}/>
        playerScore = <PlayerWinScore player_score={props.player_score} />
        dealerScore = <DealerLoseScore dealer_score={props.dealer_score} />
        break;
    default:  //"continue":
        playerActions = <HitstandOpts handleAction={props.handleAction} />
        playerScore = <PlayerScore player_score={props.player_score}/>
        banner = <Continue />
        break;
    }

    return(
    <React.Fragment>
    <h3 className="hand outcome_color">Dealer</h3>
        
        <div className="cards"> 
         
            {StaticCards}
            {CardList}
        </div>
            {dealerScore}
    <h3 className="hand outcome_color">Player</h3>
        <div className="cards"> 
            {props.player_imgs.map((cardImage, index) => 
            <img className="App-image-player" key={index} alt="" src={require(`./${cardImage}`)} />)}
        </div>
            {playerScore}
            {playerActions}
            <p>Your Balance: <span className="end_balance"> ${props.balance} </span></p>
            {banner}
    </React.Fragment>
    );
        
};



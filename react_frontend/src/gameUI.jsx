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
        console.log(count)
        const interval = setInterval(() => {
            if (counter >= props.dealer_imgs.length) {
                clearInterval(interval);
            } else {
                setCount(count => count + 1);
                counter++;}
        }, 300);
        return () => clearInterval(interval); 
      }, [props.dealer_imgs, count]);
    
      let StaticCards = props.dealer_imgs.slice(0, 1).map((cardImage, index) => {
        return(
            <img className="App-image" key={index} alt="" src={require(`./${cardImage}`)} /> )}
        );

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
            <button className="btn btn--outline" onClick={() => sendButton("hit")}> Hit </button>
            <button className="btn btn--outline" onClick={() => sendButton("stand")}> Stand </button>
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
                <div className="fade-in-image" >
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
    <h3 className="hand">Dealer Hand</h3>
        <div className="card-row">
        <div className="cards"> 
        <div className="card-box"> 
            {StaticCards}
            {CardList}
        </div>
        </div>
        </div>
            {dealerScore}
    <h3 className="hand">Player Hand</h3>
        <div className="cards"> 
        <div className="card-box">
            {props.player_imgs.map((cardImage, index) => 
            <img className="App-image-player" key={index} alt="" src={require(`./${cardImage}`)} />)}
        </div>
        </div>
            {playerScore}
            {playerActions}
            <p>Your Balance: <span className="end_balance"> ${props.balance} </span></p>
            {banner}
    </React.Fragment>
    );
        
};



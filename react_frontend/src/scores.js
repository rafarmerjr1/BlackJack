import './App.css';
import React from 'react'

export function DealerWinScore(props){
    return(
        <React.Fragment>
        <h3>Dealer Score: <span className="score">{props.state.dealer_score}</span></h3>
        </React.Fragment>
    )
}

export function PlayerLoseScore(props){
    return (
        <React.Fragment>
        <h3>Player Score: <span className="losing_score">{props.state.player_score}</span></h3>
        </React.Fragment> 
)
}

export function PlayerWinScore(props){
    return (
        <React.Fragment>
        <h3>Player Score: <span className="score">{props.state.player_score}</span></h3>
        </React.Fragment> 
)
}

export function DealerLoseScore(props){
    return(
        <React.Fragment>
        <h3>Dealer Score: <span className="losing_score">{props.state.dealer_score}</span></h3>
        </React.Fragment>
)
}
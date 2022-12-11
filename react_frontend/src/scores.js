import './App.css';
import React from 'react'

// These functions export the player and dealer score the UI

export function DealerWinScore(props){
    return(
        <React.Fragment>
        <h3 className="score fade-in-image">{props.state.dealer_score}</h3>
        </React.Fragment>
    )
}

export function PlayerLoseScore(props){
    return (
        <React.Fragment>
        <h3 className="losing_score">{props.state.player_score}</h3>
        </React.Fragment> 
)
}

export function PlayerWinScore(props){
    return (
        <React.Fragment>
        <h3 className="score">{props.state.player_score}</h3>
        </React.Fragment> 
)
}

export function DealerLoseScore(props){
    return(
        <React.Fragment>
        <h3 className="losing_score fade-in-image">{props.state.dealer_score}</h3>
        </React.Fragment>
)
}
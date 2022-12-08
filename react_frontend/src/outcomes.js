import './App.css';
import React from 'react'

export function Loss(){
    return (
        <React.Fragment>
            <h1 className="fade-in-image">Sorry,</h1> 
            <h1><span className="outcome_color">you lose</span></h1>
        </React.Fragment>
    )
}

export function Win(){
    return (
        <React.Fragment>
<div className="fade-in-image">
            <h1>You</h1> 
            <h1><span className="outcome_color">Win!</span></h1>
            </div>        </React.Fragment>
    )
}

export function Tie(){
    return (
        <React.Fragment>
            <div className="fade-in-image">
            <h1>It's a</h1>
            <h1><span className="outcome_color">Tie!</span></h1>
            </div>
        </React.Fragment>
    )
}

export function Blackjack(){
    return (
        <React.Fragment>
            <div className="fade-in-image">
            <h1>You Got</h1> 
            <h1><span className="outcome_color">BLACKJACK!</span></h1>
            <p>2x winnings!</p>
            </div>
        </React.Fragment>
    )
}
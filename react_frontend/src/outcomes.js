import './App.css';
import React from 'react'

// These functions export the hand outcome to the UI ("Banner" in GameUI)

export function Loss(){
    return (
        <React.Fragment>
            <div className="fade-in-image banner outline">
            <h1>Sorry,</h1> 
            <h1><span className="outcome_color">you lose</span></h1>
            </div>
        </React.Fragment>
    )
}

export function Win(){
    return (
        <React.Fragment>
        <div className="fade-in-image banner outline">
            <h1>You</h1> 
            <h1><span className="outcome_color">Win!</span></h1>
            </div>        
        </React.Fragment>
    )
}

export function Tie(){
    return (
        <React.Fragment>
            <div className="fade-in-image banner outline">
            <h1>It's a</h1>
            <h1><span className="outcome_color">Tie!</span></h1>
            </div>
        </React.Fragment>
    )
}

export function Blackjack(){
    return (
        <React.Fragment>
            <div className="fade-in-image banner outline">
            <h1>You Got</h1> 
            <h1><span className="outcome_color">BLACKJACK!</span></h1>
            <p>2x winnings!</p>
            </div>
        </React.Fragment>
    )
}
import './App.css';
import React from 'react'

// These functions export the hand outcome to the UI ("Banner" in GameUI)

export function Loss(){
    return (
        <React.Fragment>
            <div className="fade-in-image banner">
            <h2>Sorry, <span className="outcome_color">you lose</span></h2>
            </div>
        </React.Fragment>
    )
}

export function Win(){
    return (
        <React.Fragment>
        <div className="fade-in-image banner">
            <h2>You <span className="outcome_color">Win!</span></h2>
            </div>        
        </React.Fragment>
    )
}

export function Tie(){
    return (
        <React.Fragment>
            <div className="fade-in-image banner">
            <h2>It's a <span className="outcome_color">Tie!</span></h2>
            </div>
        </React.Fragment>
    )
}

export function Blackjack(){
    return (
        <React.Fragment>
            <div className="fade-in-image banner">
            <h2>You Got <span className="outcome_color">BLACKJACK!</span></h2>
            <p>2x winnings!</p>
            </div>
        </React.Fragment>
    )
}

export function Continue(){
    return (
        <React.Fragment>
            <div className="banner-no-underline">
            <h2>&nbsp; <span className="outcome_color">&nbsp;</span></h2>
            </div>
        </React.Fragment>
    )
}
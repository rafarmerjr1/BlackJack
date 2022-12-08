import './App.css';
import React from 'react'

export function Loss(){
    return (
        <React.Fragment>
            <h1 className="fade-in-image" ><span className="outcome_color">Sorry,</span> you lose</h1>
        </React.Fragment>
    )
}

export function Win(){
    return (
        <React.Fragment>
            <h1 className="fade-in-image">You <span className="outcome_color">Win!</span></h1>
        </React.Fragment>
    )
}

export function Tie(){
    return (
        <React.Fragment>
            <h1 className="fade-in-image">It's a <span className="outcome_color">Tie!</span></h1>
        </React.Fragment>
    )
}

export function Blackjack(){
    return (
        <React.Fragment>
            <h1 className="fade-in-image"> You Got</h1> 
            <h1><span className="outcome_color">BLACKJACK!</span></h1>
        </React.Fragment>
    )
}
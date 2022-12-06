import './App.css';
import React from 'react'

export function Loss(){
    return (
        <React.Fragment>
            <h1 className="fade-in-image" ><span className="about__name">Sorry,</span> you lose</h1>
        </React.Fragment>
    )
}

export function Win(){
    return (
        <React.Fragment>
            <h1 className="fade-in-image">You <span className="about__name">Win!</span></h1>
        </React.Fragment>
    )
}

export function Tie(){
    return (
        <React.Fragment>
            <h1 className="fade-in-image">It's a <span className="about__name">Tie!</span></h1>
        </React.Fragment>
    )
}

export function Blackjack(){
    return (
        <React.Fragment>
            <h1 className="fade-in-image"> You Got <span className="about__name">BLACKJACK!</span></h1>
        </React.Fragment>
    )
}
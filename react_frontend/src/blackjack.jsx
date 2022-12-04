import './App.css';
import React from 'react'
import { Link } from 'react-router-dom';


export function Blackjack(props) {
    console.log(props.bal)
    //render() {
    return (
    <React.Fragment>
        <h1>BLACKJACK!!!</h1>
        <h3>150% Winnings!</h3>
        <p>Want to play again?</p>
        <button onClick={props.cont}>Keep Playing</button>
        <p>Your Balance: ${props.state.balance}</p>
        <p>Dealer Final Score: {props.state.dealer_score}</p>
        <p>Your Final Score: {props.state.player_score}</p>
        <Link to={'/'}> Exit Game</Link>
    </React.Fragment>
    );
         };
      
export default Blackjack;
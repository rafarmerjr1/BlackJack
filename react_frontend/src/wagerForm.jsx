import './App.css';
import React from 'react'
import { Link } from 'react-router-dom';
//import { handleSubmit } from './game'


export function WagerForm(props){
    return(
    <header className="App-header">
    <body className="App-body">
        <h3>Dealer Hand</h3>

        {props.state.dealer_imgs.map((cardImage) => 
        <img className="App-image" src={require(`./${cardImage}`)} />)}

        <p>Dealer Score: {props.state.dealer_score}</p>
            
        <h3>Player Hand</h3>
        {props.state.player_imgs.map((cardImage) => 
        <img className="App-image" src={require(`./${cardImage}`)} />)}
        <p>Player Score: {props.state.player_score}</p>
        </body>
        </header>
        );
}

export default WagerForm;

// ui = <WagerForm state={this.state} />
/*
 <div id="Actions">
        <h1>Place Your Bet</h1>
        <p> I will bet the same amount. </p>
        <p>Your balance is ${props.state.balance}.</p>
        <form onSubmit={handleSubmit}>
        <input
             type="text"
             name="bet"
             value={props.state.wager}
             onChange={this.handleChange}
             />
        <input type="submit" value="Place Bet"/>
        </form>
        </div>
    <div id="HitStand">
        <button onClick={this.handleHit}> Hit </button>
        <button onClick={this.handleStand}> Stand </button>
    </div>
*/
import './App.css';
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client';
import Wager from './wager';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "dealer_score":0, 
            "player_score":0, 
            "dealer_card":"", 
            "player_card":"", 
            "dealer_imgs":[""], 
            "player_imgs":[""], 
            "next":"",
            "over":"",
            "win":"",
            "balance":1,
            "wager_set":false,
            "wager":0,
            "startGame": true
        };
        this.getFirstHand();


        this.handleSubmit = this.handleSubmit.bind(this);
        this.getNewGame = this.getNewGame.bind(this);
        this.fetchGame = this.fetchGame.bind(this);
        //this.getBalance = this.getBalance.bind(this);
        //this.fetchBalance = this.fetchBalance.bind(this);
        this.getFirstHand = this.getFirstHand.bind(this);

};
    handleChange(event) {    
        this.setState({wager: event.target.value});  
    };
    handleSubmit(event) {
        console.log("A bet was submitted!");
        event.preventDefault();
        };
    async getNewGame() {
        var gameState = await this.fetchGame();
        console.log(gameState.balance);
        this.updateState(gameState)
        //const wagerElement = createRoot(document.getElementById('root'));
        //let element = <Wagerform balance={ playerBalance.balance }/>;
        //wagerElement.render(element)
    }
    //fetchBalance(){
    //    return fetch('/newGame')
    //      .then(response => response.json())
    //};
    updateState(gameState){
        this.setState({
            balance: gameState.balance,
            dealer_score: gameState.dealer_score,
            player_score: gameState.player_score,
            dealer_card: gameState.dealer_card,
            player_card: gameState.player_card,
            dealer_imgs: gameState.dealer_imgs,
            player_imgs: gameState.player_imgs,
            next: gameState.next,
            over: gameState.over,
            win: gameState.win, 
            startGame: false
        })
    };
    async fetchGame() {
        return fetch('/newGame')
          .then(response => response.json())
          };

    async getFirstHand(){
        let startGame = this.state.startGame;
        if (startGame){
           await this.getNewGame();
        } else {};
    };
render() {
    return (
        <div className="App">
        <header className="App-header">
        <h1>Place Your Bet</h1>
        <p> I will bet the same amount. </p>
        <p>Your balance is ${this.state.balance}.</p>
        <form onSubmit={this.handleSubmit}>
        <input
             type="text"
             name="bet"
             value={this.state.wager}
             onChange={this.handleChange}
             />
        <input type="submit" value="Place Bet"/>
        </form>
          <h3>Dealer Hand</h3>
            <p>Dealer Score: {this.state.dealer_score}</p>
            <p>Dealer Card: This {this.state.dealer_card}</p>
            
            <h3>Player Hand</h3>
            <img src={require("./images/PNG-cards-1.3/10_of_clubs.png")} />
            <p>Player Score: {this.state.player_score}</p>
            <p>Player Card: Your {this.state.player_card}</p>
          </header>
      </div>
        );
};
}

export default Game;

/*
        
        const betPlaced = this.state.wager_set;
        if (!betPlaced){
            var state = this.state;
        } else {
            var state = "hi"
        }
     return (
        <div className="App">
            <header className="App-header">
            <p>{state}</p>
         </header>
         </div>
            )

*/
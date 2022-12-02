import './App.css';
import React, { useEffect, Link } from 'react'
import { createRoot } from 'react-dom/client';
import { Wager, Hitme} from './wager';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "dealer_score":0, 
            "player_score":0, 
            "dealer_card":"", 
            "player_card":"", 
            "dealer_imgs":[], 
            "player_imgs":[], 
            "next":"",
            "over":"",
            "win":"",
            "balance":1,
            "wager_set":false,
            "wager":0,
            "startGame": true, 
            "isToggleOn": true
        };
        this.getFirstHand();


        this.handleSubmit = this.handleSubmit.bind(this);
        this.getNewGame = this.getNewGame.bind(this);
        this.fetchGame = this.fetchGame.bind(this);
        //this.fetchBalance = this.fetchBalance.bind(this);
        this.getFirstHand = this.getFirstHand.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHit = this.handleHit.bind(this);
        this.handleStand = this.handleStand.bind(this)

};
    async getNewGame() {
        var gameState = await this.fetchGame();
        console.log(gameState.balance);
        this.updateState(gameState)
    }
    //fetchBalance(){
    //    return fetch('/newGame')
    //      .then(response => response.json())
    //};
    async updateState(gameState){
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
    handleChange(event) {    
        this.setState({wager: event.target.value});  
    };
    async handleSubmit(event) {
        event.preventDefault();
        console.log("A bet was submitted!" + this.state.wager);
        var newState = await Wager(this.state)
        console.log(newState)
        this.updateState(newState)
        //event.preventDefault();
        };
    async handleHit(){
        console.log("Hit");
        var newState = await Hitme(this.state);
        this.updateState(newState);
    };
    async handleStand(){
        console.log("Stand");
    };
render() {
    return (
    <div className="App">
    <header className="App-header">
    <body className="App-body">
          <h3>Dealer Hand</h3>
          
          {this.state.dealer_imgs.map((cardImage) => 
          <img className="App-image" src={require(`./${cardImage}`)} />)}
          
            <p>Dealer Score: {this.state.dealer_score}</p>
            <p>Dealer Card: This {this.state.dealer_card}</p>
            
            <h3>Player Hand</h3>
            {this.state.player_imgs.map((cardImage) => 
          <img className="App-image" src={require(`./${cardImage}`)} />)}
            <p>Player Score: {this.state.player_score}</p>
            <p>Player Card: Your {this.state.player_card}</p>

    <div id="Actions">
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
        </div>
    <div id="HitStand">
        <button onClick={this.handleHit}> Hit </button>
        <button onClick={this.handleStand}> Stand </button>
    </div>
        </body>
        </header>
      </div>
        );
};
}

export default Game;

//            <img className="App-image" src={require("./images/PNG-cards-1.3/10_of_clubs.png")} />
//          <img className="App-image" src={require(`./${cardImage}`)} /> )}

// {this.state.player_imgs.map((cardImage) => 
//  <img className="App-image" src={require(`./${cardImage}`)} />)}
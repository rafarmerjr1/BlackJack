import './App.css';
import React, { useEffect, Link } from 'react'
import { createRoot } from 'react-dom/client';
import { Wager, Hitme, Stand} from './callAPI';
import Loss from './loss';
import  Win from './win'
import Tie from './tie'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "dealer_score":0, 
            "player_score":0, 
            "dealer_imgs":[], 
            "player_imgs":[], 
            "tie":false,
            "over":"",
            "win":"",
            "balance":1,
            "wager_set":false,
            "wager":0
        };
        this.getFirstHand();


        this.handleSubmit = this.handleSubmit.bind(this);
        this.getNewGame = this.getNewGame.bind(this);
        this.fetchGame = this.fetchGame.bind(this);
        this.getFirstHand = this.getFirstHand.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHit = this.handleHit.bind(this);
        this.handleStand = this.handleStand.bind(this)
        this.GameUI = this.GameUI.bind(this);
        this.WagerUI = this.WagerUI.bind(this);
        this.continuePlaying = this.continuePlaying.bind(this);
        this.fetchContinue = this.fetchContinue.bind(this);
};
    // Initialize First Game if not already done
    async getFirstHand(){
        if (!this.state.wager_set){
           await this.getNewGame();
        } else {};
    };

    // Start Game and update State
    async getNewGame() {
        var gameState = await this.fetchGame();
        console.log(gameState.balance);
        this.updateState(gameState)
    }
    async updateState(gameState){
        this.setState({
            balance: gameState.balance,
            dealer_score: gameState.dealer_score,
            player_score: gameState.player_score,
            dealer_imgs: gameState.dealer_imgs,
            player_imgs: gameState.player_imgs,
            tie: gameState.tie,
            over: gameState.over,
            win: gameState.win
        })
    };
    async fetchGame() {
        return fetch('/newGame')
          .then(response => response.json())
          };

    // Continue after losing or winning, retaining balance
    async continuePlaying() {
        var gameState = await this.fetchContinue();
        console.log(gameState.balance);
        this.updateState(gameState, this.state.wager_set=false)
    }
    async fetchContinue() {
        return fetch('/continueGame')
          .then(response => response.json())
          };

    // Event Handlers 
    handleChange(event) {    
        this.setState({wager: event.target.value});  
    };
    async handleSubmit(event) {
        event.preventDefault();
        console.log("A bet was submitted!" + this.state.wager);
        this.setState({wager_set: true}) 
        var newState = await Wager(this.state)
        console.log(newState)
        await this.updateState(newState)
        //event.preventDefault();
        };
    async handleHit(){
        console.log("Hit");
        var newState = await Hitme(this.state);
        this.updateState(newState);
    };
    async handleStand(){
        console.log("Stand");
        var newState = await Stand(this.state);
        this.updateState(newState);
    };

    // Form UIs for Game Play
    GameUI(){
        return(
        <React.Fragment>
        <h3>Dealer Hand</h3>
            {this.state.dealer_imgs.map((cardImage) => 
            <img className="App-image" src={require(`./${cardImage}`)} />)}
            <p>Dealer Score: {this.state.dealer_score}</p>
            
        <h3>Player Hand</h3>
            {this.state.player_imgs.map((cardImage) => 
            <img className="App-image" src={require(`./${cardImage}`)} />)}
            <p>Player Score: {this.state.player_score}</p>
             
            <button onClick={this.handleHit}> Hit </button>
            <button onClick={this.handleStand}> Stand </button>
        </React.Fragment>
        );
    };

    // Only display if wager_set state is false
    WagerUI(){
        return (
        <React.Fragment>
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
        </React.Fragment>
        );
    };
render() {
    
    //Rendering Logic based on game state:
    let ui = null;
    if (!this.state.win && this.state.over){
        console.log("You lose!");
        ui = <Loss state={this.state} cont={this.continuePlaying}/>;
        console.log(this.state.balance)
    }
    else if (this.state.win && this.state.over){
        console.log("You Win!");
        ui = <Win state={this.state} cont={this.continuePlaying} />;
    }
    else if (!this.state.win && !this.state.over && !this.state.wager_set){
        console.log("Taking bets...");
        ui = <this.WagerUI />; 
    }
    else if (!this.state.win && !this.state.over && this.state.wager_set && !this.state.tie){
        console.log("Game on...");
        ui = <this.GameUI />; 
    }
    else if (this.state.tie){
        console.log("Tie!");
        ui = <Tie state={this.state} />; 
    }
    else {}



    return (
        <div className="App">
            <header className="App-header">
            <body className="App-body">
            {ui}
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

/*
//ui = <WagerForm state={this.state} handleHit={this.handleHit} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleStand={this.handleStand} />;

    GameUI(){
        return(
        <React.Fragment>
          <h3>Dealer Hand</h3>

          {this.state.dealer_imgs.map((cardImage) => 
          <img className="App-image" src={require(`./${cardImage}`)} />)}

            <p>Dealer Score: {this.state.dealer_score}</p>
            
            <h3>Player Hand</h3>
            {this.state.player_imgs.map((cardImage) => 
          <img className="App-image" src={require(`./${cardImage}`)} />)}
            <p>Player Score: {this.state.player_score}</p>

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
            <button onClick={this.handleHit}> Hit </button>
            <button onClick={this.handleStand}> Stand </button>
        </React.Fragment>
        
        );
    };


*/
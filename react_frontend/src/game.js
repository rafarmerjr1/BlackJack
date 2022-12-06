import './App.css';
import React, { useEffect, Link } from 'react'
import { Wager, Hitme, Stand, fetchGame, fetchContinue } from './callAPI';
import Loss from './loss';
import  Win from './win'
import Tie from './tie'
import Blackjack from './blackjack';
import { GameUI } from './gameUI';
import { WagerUI } from './wagerUI';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "dealer_score":0, 
            "player_score":0, 
            "dealer_imgs":[], 
            "player_imgs":[], 
            "results":"",
            "balance":1,
            "wager_set":false,
            "wager":0
        };
        this.getFirstHand();  // Deals a hand if not already in an active game

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getNewGame = this.getNewGame.bind(this);
        this.getFirstHand = this.getFirstHand.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHit = this.handleHit.bind(this);
        this.handleStand = this.handleStand.bind(this)
        this.continuePlaying = this.continuePlaying.bind(this);
};




    // Initialize First Game if not already done 
    async getFirstHand(){
        if (!this.state.wager_set){
           await this.getNewGame();
        } else {};
    };

    // Start Game and update State 
    async getNewGame() {
        var gameState = await fetchGame();
        console.log(gameState.balance);
        this.updateState(gameState)
    }
    updateState(gameState){
        this.setState({
            balance: gameState.balance,
            dealer_score: gameState.dealer_score,
            player_score: gameState.player_score,
            dealer_imgs: gameState.dealer_imgs,
            player_imgs: gameState.player_imgs,
            results: gameState.results
        })
    };

    // Continue after losing or winning, retaining dollar balance 
    async continuePlaying(e) {
        e.preventDefault();
        var gameState = await fetchContinue();
        console.log(gameState.balance);
        this.updateState(gameState, this.state.wager_set=false)  //reset wager_set to false so new hand will be auto-dealt
    }

    // Event Handlers 
    handleChange(event) {    
        this.setState({wager: event.target.value});  
    };

    // "Place Bet" Button
    async handleSubmit(event) {
        event.preventDefault();
        console.log("A bet was submitted!" + this.state.wager);
        this.setState({wager_set: true}) 
        var newState = await Wager(this.state)
        console.log(newState)
        //await this.updateState(newState)
        this.updateState(newState)
        //event.preventDefault();
        };

    // "Hit" button
    async handleHit(e){
        e.preventDefault();
        console.log("Hit");
        var newState = await Hitme(this.state);
        this.updateState(newState);
    };

    // "Stand" Button
    async handleStand(e){
        e.preventDefault();
        console.log("Stand");
        var newState = await Stand(this.state);
        this.updateState(newState);
    };
render() {
    
    //UI Rendering Logic based on game state:
    let ui = null;

    
    // Place Bet
    if (this.state.results === "continue" && !this.state.wager_set){
        ui = <WagerUI state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />; 
    }
    // Play Game
    else if (this.state.results === "continue" && this.state.wager_set){
        ui = <GameUI state={this.state} handleHit={this.handleHit} handleStand={this.handleStand} />; 
    }
    // loss
    else if (this.state.results === "loss"){             
        ui = <Loss state={this.state} cont={this.continuePlaying}/>;
        console.log(this.state.balance)
    } 
    // win
    else if (this.state.results === "win"){         
        ui = <Win state={this.state} cont={this.continuePlaying} />;
    }
    // Tie
    else if (this.state.results === "tie"){
        ui = <Tie state={this.state} cont={this.continuePlaying} />; 
    }
    // BlackJack hand
    else if (this.state.results === "blackjack"){
        ui = <Blackjack state={this.state} cont={this.continuePlaying} />; 
    }
    else {}  // Will want to return 404 here

    // Return UI
    return (
        <div className="dark app" id="top">
            <header className="header center"> 
            <div className="about center">
            <h1>Let's Play <span className="about__name">Blackjack!</span></h1>
            </div>
            </header>
            <main>
            <div className="about center">
            
            {ui}
            
            </div>

            </main>
            </div>

        );
};
}

export default Game;

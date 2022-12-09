import './App.css';
import React from 'react';
import { Navigate, useHistory, useNavigate } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import { Wager, Hitme, Stand, fetchGame, fetchContinue, fetchBalance, fetchClear } from './callAPI';
import { GameUI } from './gameUI';
import { WagerUI } from './wagerUI';
import { Footer } from './footer';
import { Broke } from './broke';
import { Home } from './home';

const initialState = {
    "dealer_score":0, 
    "player_score":0, 
    "dealer_imgs":[], 
    "player_imgs":[], 
    "results":"",
    "balance":1,
    "wager_set":false,
    "wager":0
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dealer_score:0, 
            player_score:0, 
            dealer_imgs:[], 
            player_imgs:[], 
            results:"",
            balance:1,
            wager_set:false,
            wager:0
        };

        this.gameStarted = false
        
        //this.getFirstHand();  // Deals a hand if not already in an active game

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getNewGame = this.getNewGame.bind(this);
        //this.getFirstHand = this.getFirstHand.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHit = this.handleHit.bind(this);
        this.handleStand = this.handleStand.bind(this)
        this.continuePlaying = this.continuePlaying.bind(this);
        this.getState = this.getState.bind(this)
        this.continueSameWager = this.continueSameWager.bind(this)
        this.reset_game = this.reset_game.bind(this);
        this.getBalance = this.getBalance.bind(this);
};

    // Initialize First Game if not already done 

    async componentDidMount(){
        if (!this.gameStarted) {
            console.log("firsthandCalled")
            this.gameStarted = true
            //await this.getNewGame()
            await this.getBalance()
        }
    }

    //async getFirstHand(){
    //    //if (!this.state.wager_set){
    //    console.log("firsthandCalled")
    //    await this.getNewGame()
    //    }; 

    // First thing - get player balance so they can wager:
    async getBalance(){
        var gameState = await fetchBalance()
        console.log("getBalanceCalled");
        this.setState({balance: gameState.balance})
        console.log(this.state)
    }

    // Start Game and update State 
    async getNewGame() {
        var gameState = await fetchGame();
        console.log("newGameCalled");
        this.updateState(gameState)
        console.log(this.state)
    }
    
    // Used for Broke and input checking functionality to start over
    async reset_game(){
        //e.preventDefault()
        fetchClear()
        this.setState({wager_set: false})
        //this.getNewGame()
        //return redirect("/");        
    };
    
    updateState(gameState){
        this.setState({
            dealer_score: gameState.dealer_score,
            player_score: gameState.player_score,
            dealer_imgs: gameState.dealer_imgs,
            player_imgs: gameState.player_imgs,
            results: gameState.results,
            balance: gameState.balance,
        })
    };

    // Continue after losing or winning, retaining dollar balance 
    async continuePlaying(e) {
        e.preventDefault()
        this.setState({wager_set: false})
        //var gameState = await fetchContinue();
        //console.log(gameState.balance);
        //this.updateState(gameState, this.setState({wager_set: false}))  //reset wager_set to false so new hand will be auto-dealt
    };

    async continueSameWager(e){
        e.preventDefault();
        //send wager to trigger the wager check in the set_wager function.
        let newState = await Wager(this.state)
        console.log(newState)
        if (newState.results === "broke" || newState.results === "invalid" ){
            //this.setState({results: newState.results})
            this.updateState(newState);
        }
        else {
            var gameState = await fetchContinue();
            console.log(gameState.balance);
            this.updateState(gameState);
        }
    }

    // Event Handlers 
    handleChange(event) {    
        this.setState({wager: event.target.value});  
    };

    // "Place Bet" Button
    async handleSubmit(event) {
        event.preventDefault();
        var currentWager = this.state
        this.setState({wager_set: true}) 
        var newState = await Wager(currentWager)
        this.setState({results: newState.results})
        if (newState.results != "broke" && newState.results != "invalid"){
            var gameState = await fetchContinue();
            this.updateState(gameState) 
        }

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
    getState(){
        return this.state;
    }
render() {
    
    //UI Rendering Logic based on game state:
    let ui = null;
    let footer = null;
    
    // Check for fraud
    if (this.state.results === "broke" || this.state.results === "invalid"){
        ui = <Broke resetGame={this.reset_game} />      
}

    // Place Bet
    else if (!this.state.wager_set && this.state.results !== "broke" && this.state.results !== "invalid"){
        ui = <WagerUI state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} cont={this.continuePlaying} resetGame={this.reset_game}/>; 
        footer = null;
    }

    // Play Game
    else if (this.state.wager_set && this.state.results !== "broke" && this.state.results !== "invalid"){
        ui = <GameUI getState={this.getState} state={this.state} handleHit={this.handleHit} handleStand={this.handleStand} cont={this.continuePlaying} contWag={this.continueSameWager} />; 
        footer = <Footer/>
    }

    else {}  // Will want to return 404 here

    // Return UI
    return (
        <div className="dark app center" id="top">
            <header className="header"> 
            
            {/*<h1>Let's Play <span className="about__name">Blackjack!</span></h1> */}
            
            </header>
            <main>
            
            
            {ui}
            

            </main>
            {footer}
        </div>

        );
};
}

export default Game;

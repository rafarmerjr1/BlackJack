import './App.css';
import React from 'react';
import { Wager, playerAction, fetchContinue, fetchBalance, fetchClear } from './callAPI';
import { GameUI } from './gameUI';
import { WagerUI } from './wagerUI';
import { Footer } from './footer';
import { Broke } from './broke';

// Main application code

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
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHit = this.handleHit.bind(this);
        this.handleStand = this.handleStand.bind(this)
        this.continuePlaying = this.continuePlaying.bind(this);
        this.continueSameWager = this.continueSameWager.bind(this)
        this.reset_game = this.reset_game.bind(this);
        this.getBalance = this.getBalance.bind(this);
        //this.updateState = this.updateState.bind(this);
};

    // First - Trigger First Game if not already done by calling the API for player balance
    async componentDidMount(){
        if (!this.gameStarted) {
            this.gameStarted = true
            await this.getBalance()
        }
    }

    // Second - get player balance so they can wager:
    async getBalance(){
        var gameState = await fetchBalance()
        this.setState({balance: gameState.balance})
    }

    // Used for Broke and input checking functionality to start over
    async reset_game(){
        fetchClear()
        this.setState({wager_set: false})
    };
    
    // Should I bind this?
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
    };

    // Continue after losing or winning, but player can choose a different wager amount
    async continueSameWager(e){
        e.preventDefault();

        //send wager to trigger the wager check in the set_wager function.
        let newState = await Wager(this.state)


        if (newState.results === "broke" || newState.results === "invalid" ){
            // change state in case bad input
            this.updateState(newState);
        }
        else {
            //Deal hand
            var gameState = await fetchContinue();
            this.updateState(gameState);
        }
    }
      
//  Event Handlers  
    
    // "Place Bet" form
    handleChange(event) {    
        this.setState({wager: event.target.value});  
    };

    // "Place Bet" form Button - This is how the first hand is dealt
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
        var newState = await playerAction({action: "hit"});
        this.updateState(newState);
    };

    // "Stand" Button
    async handleStand(e){
        e.preventDefault();
        var newState = await playerAction({action: "stand"});
        this.updateState(newState);
    };

render() {
    
    //UI Rendering Logic based on game state:
    let ui = null;
    let footer = null;
    /*
    switch(this.state.results){
        case "broke": 
        case "invalid":
            ui = <Broke resetGame={this.reset_game} /> 
            break;
        }
    switch(this.state.wager_set){
        case true:
            ui = <GameUI state={this.state} handleHit={this.handleHit} handleStand={this.handleStand} cont={this.continuePlaying} contWag={this.continueSameWager} />; 
            footer = <Footer/>
            break;
        case false:
            ui = <WagerUI state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} cont={this.continuePlaying} resetGame={this.reset_game}/>; 
            footer = null;
            break;
    }
    */

    
    // Check for fraud
    if (this.state.results === "broke" || this.state.results === "invalid"){
        ui = <Broke resetGame={this.reset_game} />      
}

    // Place Bet via WagerUI
    else if (!this.state.wager_set && this.state.results !== "broke" && this.state.results !== "invalid"){
        ui = <WagerUI state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} cont={this.continuePlaying} resetGame={this.reset_game}/>; 
        footer = null;
    }

    // Play Game via GameUI
    else if (this.state.wager_set && this.state.results !== "broke" && this.state.results !== "invalid"){
        ui = <GameUI state={this.state} handleHit={this.handleHit} handleStand={this.handleStand} cont={this.continuePlaying} contWag={this.continueSameWager} />; 
        footer = <Footer/>
    }

    else {}  // Will want to return 404 here
    
    return (
        <div className="dark app center" id="top">
            
            <header className="header"> 
            {/* Header will go here */}
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

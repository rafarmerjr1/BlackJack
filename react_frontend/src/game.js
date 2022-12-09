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
        
        this.handleAction = this.handleAction.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.determineWager = this.determineWager.bind(this)
        this.reset_game = this.reset_game.bind(this);
        this.getBalance = this.getBalance.bind(this);
        //this.updateState = this.updateState.bind(this);
};

    // First - Trigger Game by calling the API for player balance
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

    // Reset everything before starting new game
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

    // logic to keep or change wager after hand
    async determineWager(bet) {
        if (bet === "change"){
            this.setState({wager_set: false})
        }
        else if (bet == "keep" ) {
            let newState = await Wager(this.state)
                if (newState.results === "broke" || newState.results === "invalid" ){
                    this.updateState(newState); // change state in case bad input
                }
                else {
                    var gameState = await fetchContinue();
                    this.updateState(gameState);
                }
            }
    };

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
        if (newState.results !== "broke" && newState.results !== "invalid"){
            var gameState = await fetchContinue();
            this.updateState(gameState) 
        }

        };
    // handle Hit and Stand
    async handleAction(action){
        var newState = await playerAction({action: action});
        this.updateState(newState);
    }

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
        ui = <GameUI state={this.state} determineWager={this.determineWager} handleAction={this.handleAction} cont={this.continuePlaying} contWag={this.continueSameWager} />; 
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

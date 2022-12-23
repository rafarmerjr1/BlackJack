import './App.css';
import React, { useState } from 'react';
import { Wager, playerAction, fetchContinue, fetchBalance, fetchClear } from './callAPI';
import { GameUI } from './gameUI';
import { WagerUI } from './wagerUI';
import { Footer } from './footer';
import { Broke } from './broke';
import { ErrorPage } from './404';
import {ErrorBoundary} from 'react-error-boundary';
import { Home } from './home';

// Main application code
export default function Game(){

    const [dealer_score, setDealer_score] = useState(0);
    const [player_score, setPlayer_score] = useState(0);
    const [dealer_imgs, setDealer_imgs] = useState([]);
    const [player_imgs, setPlayer_imgs] = useState([]);
    const [results, setResults ] = useState("new");
    const [balance, setBalance] = useState(0);
    const [wager_placed, setWager_placed] = useState(false);
    const [wager, setWager] = useState(0);

    let ui = null;
    let footer = null;

    async function getBalance(){
        let gameState = await fetchBalance()
        setBalance(gameState.balance)
    };

    async function reset_game() {
        let newResults = await fetchClear()
        setResults(newResults.results)
    }

    function updateState(gameState){
            setDealer_score(gameState.dealer_score)
            setPlayer_score(gameState.player_score)
            setDealer_imgs(gameState.dealer_imgs)
            setPlayer_imgs(gameState.player_imgs)
            setResults(gameState.results)
            setBalance(gameState.balance)
    };

    async function determineWager(bet) {
        if (bet === "change"){
            setWager_placed(false)
        }
        else if (bet === "keep" ) {
            keepWager();
            }
    };

    // POST wager to confirm that it is not over-balance, then send GET to continue with another hand
    async function keepWager() {
        let newState = await Wager({"wager": wager})
            if (newState.results === "broke" || newState.results === "invalid" ){
                updateState(newState); // change state in case bad input
            }
            else {
                let gameState = await fetchContinue();
                setDealer_imgs([]);
                setPlayer_imgs([]);
                updateState(gameState); //Continue with same wager
            }
    }

    // "Place Bet" form field
    function handleChange(event) {   
        setWager(event.target.value);  
    };

    // "Place Bet" form Button 
    async function handleSubmit(event) {
        event.preventDefault();
        setWager_placed(true) 
        let newState = await Wager({"wager": wager})
        setResults(newState.results)
        if (newState.results !== "broke" && newState.results !== "invalid" && newState.results !== "Error"){
            let gameState = await fetchContinue();
            updateState(gameState) 
        }
        };

    // Hit or Stand buttons
    async function handleAction(action){
        let newState = await playerAction({"action": action});
        updateState(newState);
    }        

    function startNewGame(){
        setResults("needWager");
    }

    // Error handling
    function ErrorFallBack({error, resetErrorBoundary}) {
        return(
            <ErrorPage resetGame={reset_game}/>
        )
    }
    
    // Rendering Logic:
        if (results === "new"){
            ui = <Home startNewGame={startNewGame} getBalance={getBalance} resetGame={reset_game} />
    }  
        else if (results === "Error"){
            ui = <ErrorPage resetGame={reset_game} />
        }
        else if (results === "broke" || results === "invalid"){ 
            ui = <Broke resetGame={reset_game} />       
    } 
        else if (!wager_placed || results === "needWager") {
            ui = 
            <WagerUI balance={balance} 
            wager={wager} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            resetGame={reset_game}/>; 
            footer = null;
        }
        else if (wager_placed){ 
            ui = 
            <GameUI balance={balance} 
            wager={wager} 
            player_score={player_score} 
            player_imgs={player_imgs} 
            dealer_imgs={dealer_imgs} 
            dealer_score={dealer_score} 
            determineWager={determineWager} 
            handleAction={handleAction} 
            results={results} />; 
            footer = <Footer startNewGame={startNewGame} getBalance={getBalance} resetGame={reset_game}/>
        }
        else {
            ui = <ErrorPage startNewGame={startNewGame} getBalance={getBalance} resetGame={reset_game}/>
        }  
        return (
            <ErrorBoundary FallbackComponent={ErrorFallBack}>
            <div className="dark app" id="top">
                <header className="header center"> 
                <h1>Let's Play Blackjack!</h1>
                <a className="link" href="https://github.com/rafarmerjr1/BlackJack">
                https://github.com/rafarmerjr1/BlackJack
                </a>
                </header>
                <main className="center">
                {ui}
                </main>
                <footer className="footer center">
                {footer}
                </footer>
            </div>
            </ErrorBoundary>
            );
    };
    

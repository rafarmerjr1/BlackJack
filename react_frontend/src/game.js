import './App.css';
import React, { useEffect, useState } from 'react';
import { Wager, playerAction, fetchContinue, fetchBalance, fetchClear } from './callAPI';
import { GameUI } from './gameUI';
import { WagerUI } from './wagerUI';
import { Footer } from './footer';
import { Broke } from './broke';
import { ErrorPage } from './404';
import {ErrorBoundary} from 'react-error-boundary';

// Main application code

export default function Game(){

    const [dealer_score, setDealer_score] = useState(0);
    const [player_score, setPlayer_score] = useState(0);
    const [dealer_imgs, setDealer_imgs] = useState([]);
    const [player_imgs, setPlayer_imgs] = useState([]);
    const [results, setResults ] = useState("");
    const [balance, setBalance] = useState(0);
    const [wager_placed, setWager_placed] = useState(false);
    const [wager, setWager] = useState(0);

    let ui = null;
    let footer = null;

    const isMounted = React.useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
         } else {
            //setGameStarted(true);
            getBalance();    
        }
    }   )

    async function getBalance(){
        var gameState = await fetchBalance()
        setBalance(gameState.balance)
    }

    function reset_game(){
        fetchClear()
        setWager_placed(false)
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

    async function keepWager() {
        let newState = await Wager({"wager": wager})
            if (newState.results === "broke" || newState.results === "invalid" ){
                updateState(newState); // change state in case bad input
            }
            else {
                setPlayer_imgs([])
                setDealer_imgs([])
                let gameState = await fetchContinue();
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

    // Hit or Stand
    async function handleAction(action){
        let newState = await playerAction({"action": action});
        updateState(newState);
    }        

    function ErrorFallBack({error, resetErrorBoundary}) {
        return(
            <ErrorPage />
        )
    }
    // Rendering Logic:
        if (results === "Error"){
            ui = <ErrorPage />
        }
        else if (results === "broke" || results === "invalid"){ 
            ui = <Broke resetGame={reset_game} />       
    } 
        else if (!wager_placed) {
            ui = <WagerUI balance={balance} wager={wager} handleChange={handleChange} handleSubmit={handleSubmit} resetGame={reset_game}/>; 
            footer = null;
        }
        else if (wager_placed){ 
            ui = <GameUI balance={balance} wager={wager} player_score={player_score} player_imgs={player_imgs} dealer_imgs={dealer_imgs} dealer_score={dealer_score} determineWager={determineWager} handleAction={handleAction} results={results} />; 
            footer = <Footer/>
        }
        else {
            ui = <ErrorPage />
        }  
        

        return (
            <ErrorBoundary FallbackComponent={ErrorFallBack}>
            <div className="dark app" id="top">
                <header className="header center"> 
                <p>Let's Play Blackjack!</p>
                <a className="link" href="https://github.com/rafarmerjr1/BlackJack">
                https://github.com/rafarmerjr1/BlackJack
                </a>
                </header>
                <main>
                {ui}
                </main>
                <footer className="footer center">
                {footer}
                </footer>
            </div>
            </ErrorBoundary>
            );
    };
    

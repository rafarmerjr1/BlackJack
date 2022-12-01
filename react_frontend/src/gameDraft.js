/*
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client';

async function placeBet(data){
    return fetch('/wager', { 
      method:"POST",
      headers: {
      "Content-Type":"application/json"
      },
      body: JSON.stringify(data) })
      .then(response => response.json())
      }
  
export async function SendBet(data){
    console.log("Sending Bet!" + data)
    let dataJSON = {
      "bet":data
    }
    let playerStats = await placeBet(dataJSON)
    const gameElement = createRoot(document.getElementById('root'));
    let element = <Game data={playerStats}/>;
    gameElement.render(element)
  }


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""
    };
    this.dealerImages = this.dealerImages.bind(this);
    };

    dealerImages() {
    var dealerlength = this.props.data.dealer_imgs.length;
    for (let i = 0; i < dealerlength; i++){
        console.log("images?")
        return (
            <img src={require(`./${this.props.data.dealer_imgs[i]}`)} />
        )
    };
}
render() {
    return (
    <div className="App">
    <header className="App-header">
        <h3>Dealer Hand</h3>
        {this.dealerImages()}
        <p>Dealer Score: {this.props.data.dealer_score}</p>
        <p>Dealer Card: This {this.props.data.dealer_card}</p>
        <br/> 

        <h3>Player Hand</h3>
        <img src={require("./images/PNG-cards-1.3/10_of_clubs.png")} />
        <p>Player Score: {this.props.data.player_score}</p>
        <p>Player Card: Your {this.props.data.player_card}</p>
      </header>
  </div>
);
    }
}
*/
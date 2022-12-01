import './App.css';
import React from 'react'
import Game, { SendBet } from './game'
import { createRoot } from 'react-dom/client';


async function newGame() {
  return fetch('/newGame')
    .then(response => response.json())
    }

export async function Wager() {
  let playerBalance = await newGame();
  console.log(playerBalance.balance);
  const wagerElement = createRoot(document.getElementById('root'));
  let element = <Wagerform balance={ playerBalance.balance }/>;
  wagerElement.render(element)
}

class Wagerform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ""
  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.placeBet = this.placeBet.bind(this);
  }
  handleChange(event) {    
    this.setState({value: event.target.value});  
    console.log("Changes...")
  }
  async handleSubmit(event) {
    event.preventDefault();
    console.log("A bet was submitted:" + this.state.value);
    this.bet = this.state.value;
    return SendBet(this.bet)

  }
  render() {
    return (
        <div className="App">
          <header className="App-header">
            <h1>Place Your Bet</h1>
            <p> I will bet the same amount. </p>
            <br/> 
            <p>Your balance is ${this.props.balance}.</p>

            <form onSubmit={this.handleSubmit}>
                <input
                 type="text"
                 name="bet"
                 value={this.state.value}
                 onChange={this.handleChange}
                 />
              <input type="submit" value="Place Bet"/>
            </form>

            </header>
        </div>
      );
    }
}

export default Wagerform;
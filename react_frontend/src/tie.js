import './App.css';
import React from 'react'
import { Link } from 'react-router-dom';


export function Tie(props) {
    console.log(props.bal)
    //render() {
    return (
        <React.Fragment>
        <div className="section__title">
        <h1>It's a <span className="about__name">Tie!</span></h1>
        </div>

        <h4 className="section__title">Want to play again?</h4>
        <button className="btn btn--outline" onClick={props.cont}>Keep Playing</button>
        <p>Your Balance: ${props.state.balance}</p>
       
       
        <h4 className="section section__title">Dealer Final Score: {props.state.dealer_score}</h4>
    <div className="App-image-body">
        {props.state.dealer_imgs.map((cardImage) => 
        <img className="App-image-static" src={require(`./${cardImage}`)} />)}
    </div>

        <h4 className="section section__title">Your Final Score: {props.state.player_score}</h4>
    <div className="App-image-body">
        {props.state.player_imgs.map((cardImage) => 
        <img className="App-image-static" src={require(`./${cardImage}`)} />)}
    </div>
        <Link to={'/'} className="link about__role"> New Game</Link>
        <p>Balance will Reset with new game.</p>
        </React.Fragment>
    );
         };
      
export default Tie;
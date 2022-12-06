import './App.css';
import React from 'react'
import { Link } from 'react-router-dom';


export function Loss(props) {
    console.log(props.bal)
    //render() {
    return (
        <React.Fragment>
        <div className="section__title">
        <h1><span className="about__name">Sorry,</span> you lose</h1>
        </div>

        <h4 className="section__title">Want to try again?</h4>
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
      
export default Loss;

/*
 <React.Fragment>
        <h1>Sorry, You Lose!</h1>
        <p>Want to try again?</p>
        <button className="btn" onClick={props.cont}>Keep Playing</button>
        <p>Your Balance: ${props.state.balance}</p>
        <p>Dealer Final Score: {props.state.dealer_score}</p>
        
    <div className="App-image-body">
        {props.state.dealer_imgs.map((cardImage) => 
        <img className="App-image-static" src={require(`./${cardImage}`)} />)}
    </div>

        <p>Your Final Score: {props.state.player_score}</p>
    <div className="App-image-body">
        {props.state.player_imgs.map((cardImage) => 
        <img className="App-image-static" src={require(`./${cardImage}`)} />)}
    </div>
        <Link to={'/'}> Exit Game</Link>
    </React.Fragment>       
*/
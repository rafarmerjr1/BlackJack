import './App.css';
import React from 'react';

export function WagerUI(props){
    
    // reset game values and redirect user to home
    
    const newGame = () => {
        props.resetGame()  
    };
    return (
    <React.Fragment> 
         <div className="wager"> 
        <h1> Place Your Bet </h1>
        <p className="section__title"> &#40;I will bet the same amount&#41; </p>
        <h4>Your balance is <span className="score">${props.balance}</span></h4>
       <div className="section">
        <form onSubmit={props.handleSubmit}>
        <input 
             className="form"
             type="text"
             name="bet"
             value={props.wager}
             onChange={props.handleChange}
             />
        <button className="btn btn--outline section" type="submit">Place Bet</button>
        </form>

        <button className="btn btn--outline section" onClick={newGame}>new game</button>
        </div>

        </div> 
    </React.Fragment>
    );
};

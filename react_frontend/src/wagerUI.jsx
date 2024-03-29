import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';


export function WagerUI(props){
    const newGame = () => {
        props.resetGame()  
    }
    return (
    <React.Fragment> 
         <div> 
        <h1> Place Your Bet </h1>
        <p className="title"> &#40;I will bet the same amount&#41; </p>
        <h4>Your balance is <span className="score">${props.balance}</span></h4>
       <div className="section">
        <form onSubmit={props.handleSubmit} autoComplete = "off">
        <input 
             className="form"
             type="text"
             name="bet"
             onChange={props.handleChange}
             />
             <div>
             <Link className="button section" onClick={newGame}  to={'/'}> new game</Link>
             <button className="button section" type="submit">Place Bet</button>
            </div>
        </form>
        </div>

        </div> 
    </React.Fragment>
    );
};

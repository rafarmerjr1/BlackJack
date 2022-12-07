import './App.css';
import React, { useEffect, Link } from 'react'

export function WagerUI(props){
    return (
    <React.Fragment> 
         <div className="wager"> 
        <h1> Place Your Bet </h1>
        <p className="section__title"> &#40;I will bet the same amount&#41; </p>
        <h4>Your balance is <span className="score">${props.state.balance}</span></h4>
       
        <form className="section" onSubmit={props.handleSubmit}>
        <input 
             className="form"
             type="text"
             name="bet"
             value={props.state.wager}
             onChange={props.handleChange}
             />
        <button className="btn btn--outline section" type="submit">Place Bet</button>
        </form>
        </div> 
    </React.Fragment>
    );
};

/*
<WagerUI state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />

*/
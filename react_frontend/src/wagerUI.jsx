import './App.css';
import React, { useEffect, Link } from 'react'

export function WagerUI(props){
    return (
    <React.Fragment>
        <h2 className="section__title"> Place Your Bet </h2>
        <p className="section__title"> I will bet the same amount. </p>
        <p>Your balance is <span className="score">${props.state.balance}</span></p>
       
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
    </React.Fragment>
    );
};

/*
<WagerUI state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />

*/
import './App.css';
import React, { useEffect, Link } from 'react'

export function WagerUI(props){
    return (
    <React.Fragment>
        <h2 className="about__role"> Place Your Bet </h2>
        <p className="section"> I will bet the same amount. </p>
        <p>Your balance is ${props.state.balance}</p>
       
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
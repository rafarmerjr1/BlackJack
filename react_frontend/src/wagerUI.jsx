import './App.css';
import React, { useEffect, Link } from 'react'

export function WagerUI(props){
    return (
    <React.Fragment>
        <h1>Place Your Bet</h1>
        <p> I will bet the same amount. </p>
        <p>Your balance is ${props.state.balance}</p>
       
        <form onSubmit={props.handleSubmit}>
        <input
             type="text"
             name="bet"
             value={props.state.wager}
             onChange={props.handleChange}
             />
        <input className="btn" type="submit" value="Place Bet"/>
        </form>
    </React.Fragment>
    );
};

/*
<WagerUI state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />

*/
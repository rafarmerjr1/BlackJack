import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';


export function Win(props) {
    return (
        <React.Fragment>
        <h1>You Win!</h1>
        <p>Want to play again?</p>
        <p>Your Balance: ${props.bal}</p>
        <Link to={'/'}> New Game</Link>
        </React.Fragment>
    );
};

export default Win;

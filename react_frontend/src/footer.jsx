import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export function Footer(props){
    const clear = () => {
        props.resetGame() 
    }
    return (
        <React.Fragment>
        <div className="outline">
            <div className="section__title">
                <Link to={'/'} className="link" onClick={clear}> Start New Game?</Link>
            </div>
                <p>Balance will reset to $100.</p>
        </div>
        </React.Fragment>
    )
}
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export function Footer(){
    return (
        <footer className="footer">

        <div className="outline">
            <div className="section__title">
                <Link to={'/'} className="link"> Start New Game?</Link>
            </div>
                <p>Balance will reset to $100.</p>
        </div>
        </footer>
    )
}
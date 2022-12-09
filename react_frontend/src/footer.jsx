import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import { fetchClear } from './callAPI';



export function Footer(){
    const navigate = useNavigate();

    const clear = () => {
        fetchClear()
    }

    return (
        <footer className="footer">

        <div className="outline">
            <div className="section__title">
                <Link to={'/'} className="link" onClick={clear}> Start New Game?</Link>
            </div>
                <p>Balance will reset to $100.</p>
        </div>
        </footer>
    )
}
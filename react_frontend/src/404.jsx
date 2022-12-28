import './App.css';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchClear } from './callAPI';


// 404 page
export function ErrorPage(props) {
    const navigate = useNavigate();

    const NewGame = () => {
        
        //props.resetGame() 
        fetchClear()
        navigate("/", {replace: true});
    }
    return(
        <React.Fragment>
            <div className="dark app" id="top">
        <div className="home">        
            <button onClick={NewGame}> 
             <img className="home-Image" src={require('./images/titlecard.png')} alt="homeImage"/> 
            </button>
            <h1>404</h1>
            <h2 className="fade-in-image section" ><span className="outcome_color">Something's Wrong - </span> I'm not sure what it is...</h2>
            <h4>Maybe you should try starting a new game.</h4>
        </div>
        </div>
        </React.Fragment>
    )
}


import './App.css';
import React, { useEffect, useState } from 'react'

// NEWGAME Fetch
export async function fetchGame() {
  return fetch('/newGame')
    .then(response => response.json())
    };

// CONTINUE fetch
export async function fetchContinue() {
  return fetch('/continueGame')
    .then(response => response.json())
    };

//CLEAR IT fetch
export async function fetchClear() {
  return fetch('/clearIt')
    .then(response => response.json())
    };

//GET STATE fetch
export async function fetchState() {
  return fetch('/getState')
    .then(response => response.json())
    };

// GET BALANCE fetch
export async function fetchBalance() {
  return fetch('/getBalance')
    .then(response => response.json())
    };


// WAGER Fetch and function
export async function Wager(props) {
    console.log(props);
     let newState = await postWager(props);
     console.log("newState:"+newState)
     return newState;
  }

  async function postWager(props) {
    return fetch('/wager', { 
      method:"POST",
      headers: {
      "Content-Type":"application/json"
      },
      body: JSON.stringify(props) })
      .then(response => response.json())
 }
  
// HIT Fetch and function
 export async function Hitme(props) {
  console.log(props);
   let newState = await postHit(props);
   console.log("newState:"+newState)
   return newState;
}

async function postHit(props) {
  return fetch('/Hitme', { 
    method:"POST",
    headers: {
    "Content-Type":"application/json"
    },
    body: JSON.stringify(props) })
    .then(response => response.json())
}

//STAND Fetch and function
export async function Stand(props) {
  console.log(props);
   let newState = await postStand(props);
   console.log("newState:"+newState)
   return newState;
}

async function postStand(props) {
  return fetch('/stand')
    .then(response => response.json())
}
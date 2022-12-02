
import './App.css';
import React, { useEffect, useState } from 'react'
import Game, { getNewGame } from './game'

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

 
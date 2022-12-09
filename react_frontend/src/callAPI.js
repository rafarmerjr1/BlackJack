// GET Requests 

// Continue Game fetch  - deals a hand
export async function fetchContinue() {
  return fetch('/continueGame')
    .then(response => response.json())
    };

// Clear it fetch - clears data
export async function fetchClear() {
  return fetch('/clearIt')
    .then(response => response.json())
    };

// Get Player Balance fetch
export async function fetchBalance() {
  return fetch('/getBalance')
    .then(response => response.json())
    };



// POST Requests 

// POST Wager 
export async function Wager(props) {
  return fetch('/wager', { 
    method:"POST",
    headers: {
    "Content-Type":"application/json"
    },
    body: JSON.stringify(props) })
    .then(response => response.json())
 }

// POST Hit or Stand
export async function playerAction(props) {
  return fetch('/action', { 
    method:"POST",
    headers: {
    "Content-Type":"application/json"
    },
    body: JSON.stringify(props) })
    .then(response => response.json())
}

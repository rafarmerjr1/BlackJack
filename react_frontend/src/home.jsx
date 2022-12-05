import { Link } from 'react-router-dom';
import Game from './game';

export function Home() {
    return (
        <div className="App">
      <header className="App-header">
        <p>
        </p>
        <Link to={'/game'} > Play Blackjack</Link>
      </header>
    </div>
    )
}

// Can we trigger a new game with something like: onClick={Game.getNewGame()}
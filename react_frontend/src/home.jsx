import { Link } from 'react-router-dom';
import Game from './game';

export function Home() {
    return (
        <div className="dark app" id="top">
          <header className="header center"> 
            <div className="about center">
            <h1>Let's Play <span class="about__name">Blackjack!</span></h1>
            </div>
            </header>
            <main>
            <div className="about center">        
        <p>
        </p>
        <Link to={'/game'} className="link" > Click me to play!</Link>
        </div>

      </main>
    </div>
    )
}

// Can we trigger a new game with something like: onClick={Game.getNewGame()}
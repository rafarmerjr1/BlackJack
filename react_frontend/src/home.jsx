import { Link } from 'react-router-dom';
import Game from './game';

export function Home() {
    return (
        <div className="dark app" id="top">
          <main>
          <header className="header center"> 
            <div className="about center">
            <p>Let's Play <span class="about__name">Blackjack!</span></p>
            </div>
            </header>
            
            <div className="home">        
        <p>
        </p>
        <Link to={'/game'} className="link" > Click me to play!</Link>
        </div>

      </main>
    </div>
    )
}

// Can we trigger a new game with something like: onClick={Game.getNewGame()}
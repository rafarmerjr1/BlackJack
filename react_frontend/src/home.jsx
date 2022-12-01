import { Link } from 'react-router-dom';

export function Home() {
    return (
        <div className="App">
      <header className="App-header">
        <p>
        </p>
        <Link to={'/game'}> New Game</Link>
      </header>
    </div>
    )
}
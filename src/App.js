import logo from './logo.svg';
import search from './search.svg';
import './App.css';
import showSubmittedPopup from './Search.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Enter the link to the steam account you wish to check
        </p>
        <form className="App-Form" onSubmit={showSubmittedPopup}>
          <input className="App-Input" type="text" placeholder="https://steamcommunity.com/id/..."/>
          <button type="submit" className="App-Button"><img src={search} className='App-Button-Image'/></button>
        </form>
      </header>
    </div>
  );
}

export default App;

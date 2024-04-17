import logo from './logo.svg';
import search from './search.svg';
import './App.css';
import showSubmittedPopup from './Search.js';

function App() {
  function isValidSteamUrl(url) {
    const steamUrlRegex = /^https:\/\/steamcommunity\.com\/id\/[a-zA-Z0-9_-]+\/?$/;
    return steamUrlRegex.test(url);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target)
    const steamUrlInput = event.target.elements.steamUrl.value;
    if (isValidSteamUrl(steamUrlInput)) {
      showSubmittedPopup();
    } else {
      const steamUrlInput = event.target.elements.steamUrl;
      const urlInputButton = event.target.elements.urlInputButton;
      const urlInputForm = event.currentTarget;
      urlInputForm.classList.add('Error-shake-animation');
      steamUrlInput.classList.add('Error-red-flash');
      urlInputButton.classList.add('Error-red-flash');
      setTimeout(() => {
        urlInputForm.classList.remove('Error-shake-animation');
        steamUrlInput.classList.remove('Error-red-flash');
        urlInputButton.classList.remove('Error-red-flash');
      }, 350);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Enter the link to the steam account you wish to check
        </p>
        <form className="App-Form" onSubmit={handleSubmit} name="urlInputForm">
          <input 
          className="App-Input"
          type="text"
          name="steamUrl"
          placeholder="https://steamcommunity.com/id/..."
          required/>
          <button type="submit" className="App-Button" name="urlInputButton"><img src={search} className='App-Button-Image'/></button>
        </form>
      </header>
    </div>
  );
}

export default App;

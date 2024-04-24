import React, { useState } from 'react';
import logo from './logo.svg';
import search from './search.svg';
import './App.css';
import './Results.css';
import { Results, ScrollToResults} from './Results.js';

// https://steamcommunity.com/id/test

// Main app
function App() {
  // State variable to manage whether results should be displayed
  const [showResults, setShowResults] = useState(false);

  // Function to check if the URL input by the user is valid
  function isValidSteamUrl(url) {
    // Pattern for the format of a steam profile link
    const steamUrlRegex = /^https:\/\/steamcommunity\.com\/id\/[a-zA-Z0-9_-]+\/?$/;
    // Returns true of false if the URL conforms to the format
    return steamUrlRegex.test(url);
  }

  // Submission handler taking the submission event
  const handleSubmit = (event) => {
    // Prevents default submission behaviour (page refresh)
    event.preventDefault();
    // Gets value from the input
    const steamUrlInput = event.target.elements.steamUrl.value;
    // Calls checker function to see if URL is valid
    if (isValidSteamUrl(steamUrlInput)) {
      // Uncomment the next line to allow for re-searching the same user
      // setShowResults(false);
      setTimeout(() => {
        setShowResults(true);
        ScrollToResults();},0)
    // If URL is invalid
    } else {
      setShowResults(false);
      // Get the input, button and form and add animations to them
      const steamUrlInput = event.target.elements.steamUrl;
      const urlInputButton = event.target.elements.urlInputButton;
      const urlInputForm = event.currentTarget;
      urlInputForm.classList.add('Error-shake-animation');
      steamUrlInput.classList.add('Error-red-flash');
      urlInputButton.classList.add('Error-red-flash');
      // After 350ms (animation duration) remove the animations
      setTimeout(() => {
        urlInputForm.classList.remove('Error-shake-animation');
        steamUrlInput.classList.remove('Error-red-flash');
        urlInputButton.classList.remove('Error-red-flash');
      }, 350);
    }
  }

  return (
    <div className={`App ${showResults ? 'expanded' : ''}`}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Enter the link to the steam account you wish to check
        </p>
        {/* Form containing the input and button */}
        <form className="App-Form" onSubmit={handleSubmit} name="urlInputForm">
          <input 
          className="App-Input"
          type="text"
          name="steamUrl"
          placeholder="https://steamcommunity.com/id/..."/>
          <button type="submit" className="App-Button" name="urlInputButton"><img src={search} className='App-Button-Image'/></button>
        </form>
      </header>
      <header className="Results-Header">
        {showResults && <Results/>}
      </header>
    </div>
  );
}

export default App;

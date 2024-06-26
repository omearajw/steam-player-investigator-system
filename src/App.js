import React, { useState } from 'react';
import logo from './logo.svg';
import search from './search.svg';
import './App.css';
import './Results.css';
import { Results, ScrollToResults, fetchResults} from './Results.js';

// https://steamcommunity.com/id/test

// Main app
function App() {
  // State variable to manage whether results should be displayed
  const [showResults, setShowResults] = useState(false);
  const [steamUrl, setSteamUrl] = useState("");

  // Function to check if the URL input by the user is valid
  function isValidSteamUrl(url) {
    // Pattern for the format of a steam profile link
    const steamUrlRegex = /^https:\/\/steamcommunity\.com\/id\/[a-zA-Z0-9_-]+\/?$/;
    const steamUrlAltRegex = /^https:\/\/steamcommunity\.com\/profiles\/[a-zA-Z0-9_-]+\/?$/;
    // Returns true of false if the URL conforms to the format
    return steamUrlRegex.test(url) || steamUrlAltRegex.test(url);
  }

  // Submission handler taking the submission event
  const handleSubmit = (event) => {
    // Prevents default submission behaviour (page refresh)
    event.preventDefault();
    // Gets value from the input
    const steamUrlInput = event.target.elements.steamUrl.value;
    setSteamUrl(steamUrlInput);
    // Calls checker function to see if URL is valid
    if (isValidSteamUrl(steamUrlInput)) {
      // If url is valid then the results section is shown
      setShowResults(false);
      // Timeout is used to allow user to search again - otherwise results aren't refreshed
      setTimeout(() => {
        setShowResults(true);
        ScrollToResults();
      },0)
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
    // Once results are retrieved change app style to expanded version
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
        {showResults && <Results steamUrl={steamUrl}/>}
      </header>
    </div>
  );
}

export default App;

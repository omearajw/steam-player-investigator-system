import { accountAgeStatement, hoursPlayedStatement, isSmurfStatement, numOfFriendsStatement, numOfGamesStatement } from './ResultStatements'
import { Bounce, Fade } from 'react-reveal';

// Function used to smoothly scroll to the results
export const ScrollToResults = () => {
    // Timeout used as this function is technically called before the results section is displayed and will therefore break
    setTimeout(() => {
    // Gets the results element
    const element = document.getElementById("Smurf-Overview-Div");
    // Scrolls to the element
    element.scrollIntoView({ behavior: 'smooth', block:'center' }); // Optional: smooth scrolling
    }, 0)
}

const handleMoreInfoClick = () => {
    // Timeout used as this function is technically called before the results section is displayed and will therefore break
    setTimeout(() => {
        // Gets the results element
        const element = document.getElementById("First-Result-Section");
        // Scrolls to the element
        element.scrollIntoView({ behavior: 'smooth', block:'center' }); // Optional: smooth scrolling
        }, 0)
}

// Results section
export const Results = () => {
    // Define default userInfo with placeholder information
    const userInfo = {
        userScore: 0.90,
        username: "SmurfPlayer123",
        numOfFriends: 1,
        numOfGames: 75.8,
        ageOfAccount: 29.42,
        hoursPlayed: 2407.0,
        accountPrivacy: 0.0,
    };

    let userScoreStatement = isSmurfStatement({score: userInfo.userScore})
    
    let friendsStatement = numOfFriendsStatement({score: userInfo.numOfFriends})

    let gamesStatement = numOfGamesStatement({score: userInfo.numOfGames})

    let ageStatement = accountAgeStatement({score: userInfo.ageOfAccount})

    let hoursStatement = hoursPlayedStatement ({score: userInfo.hoursPlayed})

    return (
        <div className="Results-Div">
            <Bounce>
            <section className="Result-Section">
            <div className="Result-Div-Main" id="Smurf-Overview-Div">
                <header className="Result-Header-Main" >
                    <p>is {userInfo.username} a smurf?</p>
                    <Bounce fraction="0.99" duration={1500} delay={1500}>
                        <h2>{userScoreStatement}</h2>
                    </Bounce>
                    <Fade delay={4500}>
                        <p className="Result-Subtitle" onClick={handleMoreInfoClick}>More information Below</p>
                    </Fade>
                </header>
            </div>
            </section>
            </Bounce>

            <Bounce fraction="0.99" left>
            <section id="First-Result-Section"className="Result-Section">
            <section className="Result-Section-Left">
                <header className="Result-Header">Number of Friends</header>
                <p>{friendsStatement}</p>
            </section>
            </section>
            </Bounce>

            <Bounce fraction="0.99" right>
            <section className="Result-Section">
            <section className="Result-Section-Right">
                <header className="Result-Header">Number of Games</header>
                <p>{gamesStatement}</p>
            </section>
            </section>
            </Bounce>

            <Bounce fraction="0.99" left>
            <section className="Result-Section">
            <section className="Result-Section-Left">
                <header className="Result-Header">Age of Account</header>
                <p>{ageStatement}</p>
            </section>
            </section>
            </Bounce>

            <Bounce fraction="0.99" right>
            <section className="Result-Section">
            <section className="Result-Section-Right">
                <header className="Result-Header">Hours of Played Games</header>
                <p>{hoursStatement}</p>
            </section>
            </section>
            </Bounce>

            <Bounce fraction="0.99" left>
            <section className="Result-Section">
            <section className="Result-Section-Left">
                <header className="Result-Header">Account Privacy</header>
                <p>{userInfo.accountPrivacy}</p>
            </section>
            </section>
            </Bounce>
        </div>
    );
}
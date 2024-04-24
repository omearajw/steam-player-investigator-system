import { accountAgeStatement, hoursPlayedStatement, isSmurfStatement, numOfFriendsStatement, numOfGamesStatement } from './ResultStatements'
import { Bounce, Fade } from 'react-reveal';

// Function used to smoothly scroll to the results
export const ScrollToResults = () => {
    // Timeout used as this function is technically called before the results section is displayed and will therefore break
    setTimeout(() => {
    // Gets the results element
    const element = document.getElementById("Smurf-Rating");
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
        userScore: 0.54,
        username: "SmurfPlayer123",
        numOfFriends: 0.45,
        numOfGames: 15,
        ageOfAccount: 421,
        hoursPlayed: 2407.0,
        accountPrivacy: 0.0,
    };

    // These call the functions located in the ResultStatements file
    // They store the generated statements in corresponding variables
    let userScoreStatement = isSmurfStatement({score: userInfo.userScore})
    
    let friendsStatement = numOfFriendsStatement({score: userInfo.numOfFriends})

    let gamesStatement = numOfGamesStatement({score: userInfo.numOfGames})

    let ageStatement = accountAgeStatement({score: userInfo.ageOfAccount})

    let hoursStatement = hoursPlayedStatement ({score: userInfo.hoursPlayed})

    return (
        <div className="Results-Div">
            {/* Main part of results - Dictating if user is a smurf */}
            <Bounce>
            <section className="Result-Section">
            <div className="Result-Div-Main">
                <header className="Result-Header-Main" >
                    <p>is <b>{userInfo.username}</b> a smurf?</p>
                    <Bounce fraction="0.99" duration={1500} delay={1500}>
                        <h1 id="Smurf-Rating">{userScoreStatement}</h1>
                    </Bounce>
                    <Bounce fraction="0.99" duration={1500} delay={3000}>
                        <p>There's a {userInfo.userScore * 100}% chance</p>
                    </Bounce>
                    <Fade delay={4500}>
                        <p className="Result-Subtitle" onClick={handleMoreInfoClick}>Click for more information</p>
                    </Fade>
                </header>
            </div>
            </section>
            </Bounce>

            <Fade>
            <h1>Listed below are the factors considered when making this determination. Feel free to scroll through.</h1>
            </Fade>

            {/* Each of the following sections follow the same layout
            They bounce in once 99% of the section is visible
            They have the title of the section and then the corresponding statement about that information */}
            <Bounce fraction="0.99" left>
            <section id="First-Result-Section"className="Result-Section">
            <section className="Result-Section-Left">
                <header className="Result-Header">Number of Friends - {userInfo.numOfFriends}</header>
                <p className="Result-Paragraph">{friendsStatement}</p>
            </section>
            </section>
            </Bounce>

            <Bounce fraction="0.99" right>
            <section className="Result-Section">
            <section className="Result-Section-Right">
                <header className="Result-Header">Number of Games - {userInfo.numOfGames}</header>
                <p className="Result-Paragraph">{gamesStatement}</p>
            </section>
            </section>
            </Bounce>

            <Bounce fraction="0.99" left>
            <section className="Result-Section">
            <section className="Result-Section-Left">
                <header className="Result-Header">Age of Account - {userInfo.ageOfAccount} days</header>
                <p className="Result-Paragraph">{ageStatement}</p>
            </section>
            </section>
            </Bounce>

            <Bounce fraction="0.99" right>
            <section className="Result-Section">
            <section className="Result-Section-Right">
                <header className="Result-Header">Total Hours - {userInfo.hoursPlayed} hrs</header>
                <p className="Result-Paragraph">{hoursStatement}</p>
            </section>
            </section>
            </Bounce>

            <Bounce fraction="0.99" left>
            <section className="Result-Section">
            <section className="Result-Section-Left">
                <header className="Result-Header">Account Privacy - {userInfo.accountPrivacy}</header>
                <p className="Result-Paragraph">{userInfo.accountPrivacy}</p>
            </section>
            </section>
            </Bounce>
        </div>
    );
}
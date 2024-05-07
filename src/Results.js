import { accountAgeStatement, hoursPlayedStatement, isSmurfStatement, numOfFriendsStatement, numOfGamesStatement } from './ResultStatements'
import { Bounce, Fade } from 'react-reveal';
import React, { useState, useEffect } from 'react';

// Function used to smoothly scroll to the results
export const ScrollToResults = () => {
    // Timeout used as this function is technically called before the results section is displayed and will therefore break
    setTimeout(() => {
    // Gets the results element
    const element = document.getElementById("Smurf-Rating");
    // Scrolls to the element
    element.scrollIntoView({ behavior: 'smooth', block:'center' }); 
    }, 0)
}

const handleMoreInfoClick = () => {
    // Timeout used as this function is technically called before the results section and so is delayed ensuring results is displayed
    setTimeout(() => {
        // Gets the results element
        const element = document.getElementById("First-Result-Section");
        // Scrolls to the element
        element.scrollIntoView({ behavior: 'smooth', block:'center' }); 
        }, 0)
}

// Results section
export const Results = ({steamUrl}) => {
    const [userInfo, setUserInfo] = useState({
        userScore: -1,
        displayUsername: "Test User",

        numOfFriends: 0,
        numOfFriendsScore: 0,

        numOfGames: 0,
        numOfGamesScore: 0,

        ageOfAccount: 0,
        ageOfAccountScore: 0,

        hoursPlayed: 0,
        hoursPlayedScore: 0,

        accountPrivacy: 0,
        accountPrivacyScore: 0
    });

    // Loading variable used to show loading screen whilst data it fetched
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Define a function to fetch data asynchronously
        async function fetchData() {
            try {
                // Extract ID from steamUrl
                const steamId = steamUrl.split('/').pop();
                const response = await fetch(`http://localhost:8080/api/analyse-profile?steamid=${steamId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }

        // Call the fetchData function to fetch data asynchronously
        fetchData().then(data => {
            if (data && data.success) {
                const { username, userScore, factors } = data.data;
                console.log("Extracting data");
                console.log(data);
                setUserInfo(prevState => ({
                    ...prevState,
                    userScore: userScore,
                    displayUsername: username,  
                    numOfFriendsScore: factors.find(factor => factor.factorName === "Number of friends").score.toFixed(2),
                    numOfFriends: factors.find(factor => factor.factorName === "Number of friends").data,
                    numOfGamesScore: factors.find(factor => factor.factorName === "Number of games").score.toFixed(2),
                    numOfGames: factors.find(factor => factor.factorName === "Number of games").data,
                    ageOfAccountScore: factors.find(factor => factor.factorName === "Age of account").score.toFixed(2),
                    ageOfAccount: factors.find(factor => factor.factorName === "Age of account").data,
                    hoursPlayedScore: factors.find(factor => factor.factorName === "Hours of played games").score.toFixed(2),
                    hoursPlayed: factors.find(factor => factor.factorName === "Hours of played games").data,
                    accountPrivacyScore: factors.find(factor => factor.factorName === "Account Privacy").score.toFixed(2)
                }));
            }
            setLoading(false); // Set loading to false when data is fetched
        });
    }, []);


    // Call the functions located in the ResultStatements file
    // They store the generated statements in corresponding variables
    let userScoreStatement = isSmurfStatement({score: (1 - userInfo.userScore)});
    let friendsStatement = numOfFriendsStatement({score: userInfo.numOfFriends});
    let gamesStatement = numOfGamesStatement({score: userInfo.numOfGames});
    let ageStatement = accountAgeStatement({score: userInfo.ageOfAccount});
    let hoursStatement = hoursPlayedStatement ({score: userInfo.hoursPlayed});

    if (loading) {
        return <div className="Results-Div">
            <div className="Result-Div-Main">
                <header id="Smurf-Rating" className="Result-Header-Main">
                    <p>Loading...</p>
                </header>
            </div>
            </div>; // Show loading indicator while data is being fetched
    }
    if (userInfo.userScore == -1){ // !!! Change this to a NOT statement for program to function correctly !!!
        return (
            <div className="Results-Div">
                {/* Main part of results - Dictating if user is a smurf */}
                <Bounce duration={1000}>
                <div className="Result-Div-Main">
                    <header className="Result-Header-Main" >
                        <p>Oops...</p>
                        <Bounce duration={1000} delay={1000}>
                            <h1 id="Smurf-Rating">Something went wrong</h1>
                        </Bounce>
                        <Fade duration={1000} delay={2000}>
                            <p>Double check your link and try again.</p>
                        </Fade>
                    </header>
                </div>
                </Bounce>
            </div>
        )
    }
    else {
        return (
            <div className="Results-Div">
                {/* Main part of results - Dictating if user is a smurf */}
                <Bounce>
                <section className="Result-Section">
                <div className="Result-Div-Main">
                    <header className="Result-Header-Main" >
                        <p>is <b>{userInfo.displayUsername}</b> a smurf?</p>
                        <Bounce duration={1500} delay={1500}>
                            <h1 id="Smurf-Rating">{userScoreStatement}</h1>
                        </Bounce>
                        <Fade duration={1500} delay={3000}>
                            <p>{(1 - userInfo.userScore) * 100}% chance of smurf</p>
                        </Fade>
                        <Fade delay={4500}>
                            <p className="Result-Subtitle" onClick={handleMoreInfoClick}>Curious how we know?</p>
                        </Fade>
                    </header>
                </div>
                </section>
                </Bounce>

                <Fade>
                <h1>Listed below are the factors we considered when making this determination. Feel free to scroll through.</h1>
                </Fade>

                {/* Each of the following sections follow the same layout
                They bounce in once 99% of the section is visible
                They have the title of the section and then the corresponding statement about that information */}
                <Bounce left delay={1500}>
                <section id="First-Result-Section"className="Result-Section">
                <section className="Result-Section-Left">
                    <header className="Result-Header">Number of Friends // {userInfo.numOfFriends} Friends <span className="Result-Score"> Score: {userInfo.numOfFriendsScore}</span></header>
                    <p className="Result-Paragraph-Left">A large part of our approximation
                    is decided by the number of friends this account has - {friendsStatement}</p>
                </section>
                </section>
                </Bounce>

                <Bounce fraction={0.1} right delay={2000}>
                <section className="Result-Section">
                <section className="Result-Section-Right">
                    <header className="Result-Header">Number of Games \\ {userInfo.numOfGames} Games <span className="Result-Score"> Score: {userInfo.numOfGamesScore}</span></header>
                    <p className="Result-Paragraph-Right">The biggest thing we look at is the number of games.
                    People will be less willing to spend money on a smurf account incase they get banned. {gamesStatement}</p>
                </section>
                </section>
                </Bounce>

                <Bounce fraction={0.65} left>
                <section className="Result-Section">
                <section className="Result-Section-Left">
                    <header className="Result-Header">Age of Account // {userInfo.ageOfAccount} Days <span className="Result-Score"> Score: {userInfo.ageOfAccountScore}</span></header>
                    <p className="Result-Paragraph-Left">Something else we consider is how old the account is. {ageStatement}</p>
                </section>
                </section>
                </Bounce>

                <Bounce fraction={0.65} right>
                <section className="Result-Section">
                <section className="Result-Section-Right">
                    <header className="Result-Header">Total Hours \\ {(userInfo.hoursPlayed/60).toFixed(0)} Hrs <span className="Result-Score"> Score: {userInfo.hoursPlayedScore}</span></header>
                    <p className="Result-Paragraph-Right">The more hours - the less likely to be a smurf. {hoursStatement}</p>
                </section>
                </section>
                </Bounce>

                {/* 
                Privacy section
                <Bounce fraction={0.65} left>
                <section className="Result-Section">
                <section className="Result-Section-Left">
                    <header className="Result-Header">Account Privacy // {userInfo.accountPrivacy} <span className="Result-Score"> Score: {userInfo.accountPrivacyScore}</span></header>
                    <p className="Result-Paragraph-Left">{userInfo.accountPrivacy}</p>
                </section>
                </section>
                </Bounce> */}
            </div>
        );
    }
}
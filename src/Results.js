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

// export const fetchResults = () => {}

// Results section
export const Results = () => {
    // Define userInfo object with default values
    const userInfo = {
        userScore: 0,
        username: "",
        numOfFriends: 0,
        numOfGames: 0,
        ageOfAccount: 0,
        hoursPlayed: 0,
        accountPrivacy: 0,
    };

    fetch('http://localhost:8080/api/analyse-profile?steamid=76561198045900187')
    .then(response => {
        // Check if the response is OK
        if (!response.ok) {
            // Throw an error with the status text
            console.log("FAILURE");
            throw new Error('Network response was not ok');
        }
        // If the response is OK, parse it as JSON
        return response.json()})
    .then(data => {
        // Check if the API call was successful
        if (data.success) {
            // Extract data from API response
            const { userScore, factors } = data.data;

            // Extract relevant data from the API response
            userInfo.userScore = userScore;
            userInfo.username = factors.find(factor => factor.factorName === "Username").score;
            userInfo.numOfFriends = factors.find(factor => factor.factorName === "Number of friends").score;
            userInfo.numOfGames = factors.find(factor => factor.factorName === "Number of games").score;
            userInfo.ageOfAccount = factors.find(factor => factor.factorName === "Age of account (days)").score;
            userInfo.hoursPlayed = factors.find(factor => factor.factorName === "Hours of played games").score;
            userInfo.accountPrivacy = factors.find(factor => factor.factorName === "Account Privacy").score;
        }
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch operation
        console.error('Error fetching data:', error);
        return(<div></div>)
    });

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
                    <Bounce fraction={0.99} duration={1500} delay={1500}>
                        <h1 id="Smurf-Rating">{userScoreStatement}</h1>
                    </Bounce>
                    <Fade fraction={0.99} duration={1500} delay={3000}>
                        <p>{userInfo.userScore * 100}% chance of smurf</p>
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
            <Bounce fraction={0.99} left delay={1500}>
            <section id="First-Result-Section"className="Result-Section">
            <section className="Result-Section-Left">
                <header className="Result-Header">Number of Friends - {userInfo.numOfFriends}</header>
                <p className="Result-Paragraph-Left">A large part of our approximation
                is decided by the number of friends this account has - {friendsStatement}</p>
            </section>
            </section>
            </Bounce>

            <Bounce fraction={0.1} right delay={2000}>
            <section className="Result-Section">
            <section className="Result-Section-Right">
                <header className="Result-Header">Number of Games - {userInfo.numOfGames}</header>
                <p className="Result-Paragraph-Right">The biggest thing we look at is the number of games.
                People will be less willing to spend money on a smurf account incase they get banned. {gamesStatement}</p>
            </section>
            </section>
            </Bounce>

            <Bounce fraction={0.65} left>
            <section className="Result-Section">
            <section className="Result-Section-Left">
                <header className="Result-Header">Age of Account - {userInfo.ageOfAccount} days</header>
                <p className="Result-Paragraph-Left">Something else we consider is how old the account is. {ageStatement}</p>
            </section>
            </section>
            </Bounce>

            <Bounce fraction={0.65} right>
            <section className="Result-Section">
            <section className="Result-Section-Right">
                <header className="Result-Header">Total Hours - {userInfo.hoursPlayed} hrs</header>
                <p className="Result-Paragraph-Right">The more hours - the less likely to be a smurf. {hoursStatement}</p>
            </section>
            </section>
            </Bounce>

            <Bounce fraction={0.65} left>
            <section className="Result-Section">
            <section className="Result-Section-Left">
                <header className="Result-Header">Account Privacy - {userInfo.accountPrivacy}</header>
                <p className="Result-Paragraph-Left">{userInfo.accountPrivacy}</p>
            </section>
            </section>
            </Bounce>
        </div>
    );
}
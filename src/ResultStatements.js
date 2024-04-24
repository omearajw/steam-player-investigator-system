export const isSmurfStatement = ({score}) => {
    let statement = "We're not sure... (Something went wrong)"

    if (score == 1.0) {
        statement = "Definitely."
    }
    else if ((score >= 0.90) && (score < 1)) {
        statement = "Almost Definitely"
    }   
    else if ((score >= 0.75) && (score < 0.90)) {
        statement = "Most likely"
    }
    else if ((score >= 0.5) && (score < 0.75)) {
        statement = "Maybe..."
    }
    else if ((score >= 0.25) && (score < 0.5)) {
        statement = "Probably not"
    }
    else if ((score >= 0.0) && (score < 0.25)) {
        statement = "No."
    }

    return statement
}


export const numOfFriendsStatement = ({score}) => {
    let statement = "This is awkward."

    if (score == 1.0) {
        statement = "They're really popular. This many friends makes it extremely unlikely this is a smurf account."
    }
    else if ((score >= 0.90) && (score < 1)) {
        statement = "They have loads of friends, making it pretty unlikely this is a smurf account."
    }   
    else if ((score >= 0.5) && (score < 0.90)) {
        statement = "They've got quite a few freinds. Chances are this is no smurf."
    }
    else if ((score >= 0.25) && (score < 0.5)) {
        statement = "They have a decent number of friends. Unlikely to be a smurf"
    }
    else if ((score >= 0.1) && (score < 0.25)) {
        statement = "They don't have a lot of friends... Suspicious."
    }
    else if ((score >= 0.0) && (score < 0.1)) {
        statement = "They have literally no friends... Probably smurf."
    }

    return statement
}


export const numOfGamesStatement = ({score}) => {
    let statement = "This is awkward."

    if (score >= 200.0) {
        statement = "Wow. They have LOADS of games. Highly unlikely this person is a smurf."
    }
    else if ((score >= 50) && (score < 200)) {
        statement = "This account has plently of games, meaning they're probably not a smurf"
    }   
    else if ((score >= 20) && (score < 50)) {
        statement = "They've got lots of games, no smurf here."
    }
    else if ((score >= 5) && (score < 20)) {
        statement = "A decent library... probably not a smurf."
    }
    else if ((score >= 3) && (score < 5)) {
        statement = "Not a load of games, a little suspicious..."
    }
    else if ((score >= 1) && (score < 3)) {
        statement = "They are rocking a library with less than 3 games - smurf behaviour."
    }
    else if (score == 1) {
        statement = "They have a singular game, probably the one they're playing right now. EXTREMELY suspicious."
    }
    else if (score == 0) {
        statement = "Zero games?"
    }
    return statement
}


export const accountAgeStatement = ({score}) => {
    let statement = "This is awkward."

    if (score >= 3650.0) {
        statement = "This account is at least 10 years old. No smurfs here."
    }
    else if ((score >= 730) && (score < 3650.0)) {
        statement = "This account is been around for a while making it pretty unlikely to be a smurf."
    }   
    else if ((score >= 365) && (score < 730)) {
        statement = "Been around for a year and a bit... Could just be a newbie."
    }
    else if ((score >= 60) && (score < 365)) {
        statement = "Younger than a year. A little suspicious."
    }
    else if ((score >= 30) && (score < 60)) {
        statement = "Only a couple months old. Smurf behaviour."
    }
    else if ((score >= 7) && (score < 30)) {
        statement = "Less than a month old. Smurf?"
    }
    else if ((score >= 1) && (score < 7)) {
        statement = "Less than a week old. Very sus."
    }
    else if ((score >= 0) && (score < 1)) {
        statement = "This account was made today... Smurf."
    }

    return statement
}

export const hoursPlayedStatement = ({score}) => {
    let statement = "This is awkward."

    if (score >= 1000.0) {
        statement = "They've played a **** ton of hours. Definately not a smurf."
    }
    else if ((score >= 100) && (score < 1000)) {
        statement = "They've played quite a lot of hours, unlikely to be smurfing."
    }   
    else if ((score >= 50) && (score < 100)) {
        statement = "Played less than a hundred hours. Nothing concrete here."
    }
    else if ((score >= 10) && (score < 50)) {
        statement = "Haven't played a whole lot. Rather suspicious."
    }
    else if ((score >= 5) && (score < 10)) {
        statement = "They've played less than 10 hours. Smurfing is probable"
    }
    else if ((score >= 2) && (score < 5)) {
        statement = "Under 5 hours - Extremely suspicious."
    }
    else if ((score >= 0) && (score < 2)) {
        statement = "This is probably their first game EVER."
    }

    return statement
}
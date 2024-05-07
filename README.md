# Installing the application

In order to install the application you must download repo.\
Open CMD and navigate to application directory `.../steam-player-investigator-system`\
Run this code: `npm install --force`

<!-- # Backend Instllation

FOR PERSONAL USE ONLY

Java is required.\

Download the backend repo.\
Navigate to the backend directory and open CMD `.../InvestigatorBackend`\
Run this code: `gradlew shadowJar` or `./gradlew shadowJar`\
Locate the newly made jar file in `.../build/libs` and open CMD in that directory\

Run Docker.\
Initialise a redis container in docker by running this code in CMD `docker run --name my-redis-container -p 6379:6379 -d redis\
Ensure that new container to running.\

Run the jar file in CMD using this command `java -jar ./{jarfilename}`\
The backend will be running on `localhost:8080`\

API call is `http://localhost:8080/api/analyse-profile?steamid={STEAMID HERE}`\ -->

# Running the application
Run this code: `npm start`

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


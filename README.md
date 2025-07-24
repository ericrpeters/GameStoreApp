# GameStoreApp
## About
This site allows users to login and with a unique profile, and they are able to buy and sell 'games' with 'money'.
The site features 4 separate microservices, not including the backend database management, which are a Game News
display that pulls information from GameSpot using their API (thanks to mjande for this), an Authenticator that
handles login information for each user, a Wallet that handles how much 'money' each user has, and a Notification service
that handles the transaction history of the buyers and sellers. The frontend of the site uses React and the backend uses 
MongoDB to store the games in the database.

Requires the services: GameNews, Authenticator, Wallet, and Notifications to run properly.
The GameNews service is found at https://github.com/mjande/gaming-news-microservice.

## Installation
To start the main site, navigate to the GameStoreApp's frontend folder and run npm start in the command line.
Then go into the backend and run the same command in a different terminal.

For each of the microservices, navigate to their folder's main directory and run npm start.
A total of 6 separate command lines are needed to run the full site.




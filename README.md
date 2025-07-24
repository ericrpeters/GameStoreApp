# GameStoreApp
## About
This site allows users to login and with a unique profile, and they are able to buy and sell 'games' with 'money'.
The site features 4 separate microservices, not including the backend database management, which are a Game News
display that pulls information from GameSpot using their API (thanks to mjande for this), an Authenticator that
handles login information for each user, a Wallet that handles how much 'money' each user has, and a Notification service
that handles the transaction history of the buyers and sellers. The frontend of the site uses React and the backend uses 
MongoDB to store the games in the database.

## Requirements
GameNews:
  ```sh
    https://github.com/mjande/gaming-news-microservice
  ``` 
Authenticator:
  ```sh
    https://github.com/ericrpeters/AuthenticatorService
  ```
Wallet:
  ```sh
    https://github.com/ericrpeters/StoreWalletService
  ```
Notifications:
  ```sh
    https://github.com/ericrpeters/PurchaseNotifications
  ```

## Installation
1. Download each and form the directory with subfolders containing each service: <br>
   frontend, backend, gamenews, authenticator, wallet, and notifications

2. For the backend to work, a MongoDB cluster is needed. Create a new cluster and copy the URI that generates.
   In the backend folder, create a .env file and paste the URI. It should be MONGO_URI = 'your URI'. Be mindful of the
   username and password contained. Also in this .env file, the port can be specified. backend/server.js  has the port
   call and backend/config/db.js has the mongoose connect call for the URI.

3. To start the main site, navigate to the GameStoreApp's frontend folder and run npm start in the command line.
   Then go into the backend and run the same command in a different terminal.

4. For each of the microservices, navigate to their folder's main directory and run npm start.
   A total of 6 separate command lines are needed to run the full site.




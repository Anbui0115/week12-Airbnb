AnBnB (AirBnB Clone)

AnBnB is a full-stack-application clone of Airbnb deployed on heroku. The App uses React & Redux in the Front-end and for the backend we use Express.js & an ORM called Sequelize. Live Link: https://anbnb.herokuapp.com/

Technologies Used

This application was built with:

Javascript
React
Redux
HTML
CSS
Express
Sequelize
PostgresSQL
Features Home Page Current Spot Page Review For Current Spot Page

Locally If you would like to launch this site locally please follow these instructions:

You can also have the same result by just going to the repository link and downloading zip file and extract it to a folder on your device.
Clone this repo by using your terminal by going to a directory of where you would want the file stored and type in git clone https://github.com/Anbui0115/week12-Airbnb.git
change directories (cd) into the 'backend' directory and run the command in the CLI: npm install what this command does is grab all the dependencies needed for the application.
In the same directory(backend) create a .env file and add your own values to these variables: PORT, DB_FILE (location of the database), JWT_SECRET, and JWT_EXPIRES_IN
In the same directory(backend) load the migrations database by running the command in the CLI npx dotenv sequelize db:migrate
In the same directory(backend) load the seeder data into your database by running the command in the CLI npx dotenv sequelize db:seed:all
Now run the command in the CLI npm start to turn your backend server on.
Now run the command in another terminal in the CLI npm start If you have Google Chrome this should have started the React Application for you. If this fails you can just go to to the url of localhost:3000
Both frontend & backend should be running in order for you to see the application.
Great news you are locked in and ready to check the application out, You have successfully launched the app.

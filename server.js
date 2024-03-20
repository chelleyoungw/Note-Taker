// Dependencies
const express = require('express');
const path = require('path');


// Asks the app to use Express.js and creates the variable port that the server runs on
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware that points to the public folder
app.use(express.static('public'));

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// serves the main HTML page of the app
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// serves the notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Encapsulates and handles logic from api and allows the files to interact with the app
require('./routes/apiRoutes')(app);

// Handles GET request to return the notes.html file
require('./routes/htmlRoutes')(app);

// app listener, to start the server on the specified PORT
app.listen(PORT, () => {
    console.log('App listening at http://localhost:${PORT}')
});

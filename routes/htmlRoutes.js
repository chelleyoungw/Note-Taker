// Dependencies
const path = require('path');

// Routing
module.exports = (app) => {

    // returns notes.html
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    // serves the main HTML page of the app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};
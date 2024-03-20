// Dependencies
const path = require('path');
const fs = require('fs');

// npm pkg that allows unique ids for notes to be created to save them individually
var uniqid = require('uniqid');

// Routing
module.exports = (app) => {

    // returns saved notes as JSON
    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'));
    });
    
    // takes a new note to save on the request body
    app.post('/api/notes', (req, res) => {
        let db = fs.readFileSync('db/db.json');
        db = JSON.parse(db);
        res.json(db);

        // creates note
        let userNote = {
            title: req.body.title,
            text: req.body.text,
            id:uniqid(),
        };

        // saves note to db.json file, then returnes note to
        // client
        db.push(userNote);
        fs.writeFileSync('db/db.json', JSON.stringify(db));
        res.json(db);

    });
}
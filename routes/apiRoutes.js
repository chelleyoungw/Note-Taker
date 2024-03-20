// Dependencies
const path = require('path');
const fs = require('fs');

// npm pkg that allows unique ids for notes to be created to save them individually
var uniqueId = require('uniqId');

// Routing
module.exports = (app) => {

    // returns saved notes as JSON
    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'));
    });
    
    // takes a new note, saves, then returns a new one
    app.post('/api/notes', (req, res) => {
        let db = fs.readFileSync('db/db.json');
        db = JSON.parse(db);
        res.json(db);

        // creates note
        let userNote = {
            title: req.body.title,
            text: req.body.text,
            id:uniqueId(),
        };

        // sends note to db.json file
        db.push(userNote);
        fs.writeFileSync('db/db.json', JSON.stringify(db));
        res.json(db);

    });
}
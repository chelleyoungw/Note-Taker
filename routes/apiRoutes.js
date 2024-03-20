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

    // DELETE /api/notes/id should recieve a query parameter 
    // containing the id of a note to delete.
    app.delete('/api/notes/:id', (req, res) => {

        // Reads all notes from the db.json file
        let db = JSON.parse(fs.readFileSync('db/db.json'));

        // Removes the note with the given id property (only use 45 or 46)
        let deleteNote = db.filter(item => item.id !== req.params.id);

        // Rewrites the notes to the db.json file
        fs.writeFileSync('db/db.json', JSON.stringify(deleteNote));
        res.json(deleteNote);

    });

};
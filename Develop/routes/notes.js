const notes = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
const fs = require("fs")
// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});
// POST Route for a new UX/UI tip
// notes.delete('/:id', (req, res) => {
//   //console.log(req.params.id);

//   //  readAndDelete(req.params.id, './db/db.json');
//     // res.json(`Note deleted successfully 🚀`);//
// fs.readFile("db/db.json", "utf-8", (err, data)=>{
//   let parsedData = JSON.parse(data)
//   parsedData.filter(n => n.id !== req.params.id)
//   fs.writeFile("db/db.json", JSON.stringify(parsedData), err=> err ? console.log(err) : res.end())
// })

//   }
// );
notes.delete("/:id", (req, res) => {
	fs.readFile("db/db.json", (err, data) => {
		if (err) throw err;
		let json = JSON.parse(data);
		let notes = json.filter((note) => note.id !== req.params.id);
		console.log(notes);
		fs.writeFile("db/db.json", JSON.stringify(notes), function (err) {
			if (err) throw err;
			res.redirect("/notes");
		});
	});
});
module.exports = notes;

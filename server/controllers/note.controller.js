import Note from '../models/note';
//import modulu (lini-kolumny)
import Lane from '../models/lane';
import uuid from 'uuid';

export function getSomething(req, res) {
  return res.status(200).end();
}

export function addNote(req, res) {
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task,
  });

  newNote.id = uuid();
  //zapisanie nowej notatki
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
  //po zapisaniu notatki odnajdujemy odpowiednią linię za pomocą parametru laneId
    Lane.findOne({ id: laneId })
      .then(lane => {
  //przy użyciu metody .push() dodajemy notkę do linii.
        lane.notes.push(saved);
  //zapisujemy linię
        return lane.save();
      })
  //odsyłamy w odpowiedzi zapisaną notkę
      .then(() => {
        res.json(saved);
      });
  });
}


export function deleteNote(req, res) {
  Note.findOne({ id: req.params.noteId }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }
    if (note) {
      Lane.findOne({notes: note._id }).exec((lane) => {
        if (err) {
          res.status(500).send(err);
        }
        lane.notes.pull(note);
         lane.save();
      })
      .then(() => {note.remove(() => { res.status(200).send('Note deleted succesfull')});
      });
    } else {
      res.status(500).send('Bad argument!');
    }
  });
}

//????
export function editNote(req, res) {
  Note.findOneAndUpdate({ id: req.params.noteId }, { $set: { task: req.body.note.task } } ).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(note);
  });
}

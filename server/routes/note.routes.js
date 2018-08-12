//podpięcia kontrolera pod odpowiedni endpoint
import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();

// Add a new Note
router.route('/notes').post(NoteController.addNote);

// Edit a Note
//router.route('/notes').put(NoteController.editNote);

// Delete a note by noteId
router.route('/notes/:noteId').delete(NoteController.deleteNote);

// Edit a Note Name
router.route('/notes/:noteId').put(NoteController.editNoteName);

export default router;

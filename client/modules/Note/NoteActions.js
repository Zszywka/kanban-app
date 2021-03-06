//akcje powiązane z notkami
import uuid from 'uuid';
import callApi from '../../util/apiCaller';
// Export Constants
export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const CREATE_NOTES = 'CREATE_NOTES';
export const MOVE_WITHIN_LANE = 'MOVE_NOTES';

// Export Actions	// Export Actions
export function createNote(note, laneId) {
  return {
    type: CREATE_NOTE,
    laneId,
    note,
  };
}

export function updateNote(note, laneId) {
  return {
    type: UPDATE_NOTE,
    laneId,
    note,
  };
}

export function deleteNote(noteId, laneId) {
  return {
    type: DELETE_NOTE,
    laneId,
    noteId,
  };
}

export function editNote(noteId, laneId) {
  return {
    type: EDIT_NOTE,
    laneId,
    noteId,
  };
}

export function createNotes(notesData) {
	return {
		type: CREATE_NOTES,
		notes: notesData
	};
}

export function createNoteRequest(note, laneId) {
  return (dispatch) => {
    return callApi('notes', 'post', { note, laneId }).then(noteResp => {
      dispatch(createNote(noteResp, laneId));
    });
  }
}

export function updateNoteRequest(note) {
  return (dispatch) => {
    return callApi(`notes/${note.id}`, 'put', note).then(() => {
      dispatch(updateNote(note));
    });
  };
}

export function deleteNoteRequest(noteId, laneId) {
  return (dispatch) => {
    return callApi(`notes/${noteId}`, 'delete', { noteId, laneId }).then(() => {
      dispatch(deleteNote(noteId, laneId));
    });
  };
}

export function moveWithinLane(laneId, targetId, sourceId) {
  return {
    type: MOVE_WITHIN_LANE,
    laneId,
    targetId,
    sourceId,
  };
}

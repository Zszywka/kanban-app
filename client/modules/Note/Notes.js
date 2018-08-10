import React from 'react';
import PropTypes from 'prop-types'
import Note from './Note';
// import styles from './Notes.css';
import Edit from '../../components/Edit';

//mapujemy wszystkie notki należące do jednej linii na komponenty Note.
const Notes = ({ notes, laneId, editNote, onUpdate, onValueClick, onDelete }) => {
  return (<ul className="notes">{notes.map((note) =>
    <Note
      id={note.id}
      key={note.id}
      editing={note.editing}
      laneId={laneId}
    >
    <Edit
      editing={note.editing}
      value={note.task}
      onValueClick={() => onValueClick(note.id)}
      onUpdate={(task) => onUpdate({
          ...note,
          task,
          editing: false,
        })
      }
      onDelete={() => onDelete(note.id, laneId)}
    />
    </Note>
  )}</ul>);
};

Notes.propTypes = {
  notes: PropTypes.array,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  laneId: PropTypes.string,
  editNote: PropTypes.func,
};

export default Notes;

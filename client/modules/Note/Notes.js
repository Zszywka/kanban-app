import React from 'react';
import PropTypes from 'prop-types'
import Note from './Note';
import styles from './Note.css';
import Edit from '../../components/Edit';

const Notes = ({
  notes,
  laneId,
  onUpdate,
  onValueClick,
  onDelete,
  moveWithinLane
}) => {
  return (<ul className={styles.Notes}>{notes.map((note) =>
    <Note
      id={note.id}
      key={note.id}
      moveWithinLane={moveWithinLane}
      laneId={laneId}
    >
      <Edit
        editing={note.editing}
        value={note.task}
        onValueClick={() => onValueClick(note.id)}
        onUpdate={(task) => onUpdate({...note, task, editing: false})}
        onDelete={() => onDelete(note.id, laneId)}
      />
    </Note>
  )}</ul>);
};

Notes.propTypes = {
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  laneId: PropTypes.string,
  editNote: PropTypes.func,
  notes: PropTypes.array,
};

export default Notes;

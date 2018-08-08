//propTypes- dobrze byłoby sprawdzać typy danych przekazywanych do komponentów
import React, { PropTypes } from 'react';
import NotesContainer from '../Note/NotesContainer';

import styles from './Lane.css';

//wyświetlaniem pojedynczej linii z notatkami
const Lane = (props) => {
  const { lane, laneNotes, updateLane, addNote, deleteLane } = props;
  const laneId = lane.id;

  return (
    <div className={styles.Lane}>
      <div className={styles.LaneHeader}>
        <div className={styles.LaneAddNote}>
          <button onClick={() => addNote({ task: ‘New Note’}, laneId)}>Add Note</button>
        </div>
        <h4>{lane.name}</h4>
        <div className={styles.LaneDelete}>
          <button onClick={() => deleteLane(laneId)}>Remove Lane</button>
        </div>
      </div>
      <NotesContainer
        notes={laneNotes}
        laneId={laneId}
      />
    </div>
  );
};

//określiliśmy, że nasze propsy powinny mieć określone typy:
//linia powinna być obiektem, natomiast notatki należące do linii są reprezentowane za pomocą tablicy
//Wszystkie callbacki to funkcje
Lane.propTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array,
  addNote: PropTypes.func,
  updateLane: PropTypes.func,
  deleteLane: PropTypes.func,
};

export default Lane;

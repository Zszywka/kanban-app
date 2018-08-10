import { connect } from 'react-redux';
import Lane from './Lane';
//zaimportować wszystkie kreatory akcji linii oraz akcję tworzenia notek
import { createNoteRequest } from '../Note/NoteActions';
import { deleteLaneRequest, updateLaneRequest, editLane, moveBetweenLanesRequest } from './LaneActions';
import { createNote } from '../Note/NoteActions';
import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';
import { compose } from 'redux';

//podpiecie stanu
//Wykorzystujemy tutaj propsy, które zostały przekazane do komponentu pojedynczej linii.
//Następnie wyciągamy z nich identyfikatory notek znajdujące się w pojedynczej linii,
//a później szukamy odpowiedniej notki po jej identyfikatorze
const mapStateToProps = (state, ownProps) => {
  return {
    laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
  };
};

//podpiąć zaimportowane kreatory do propsów komponentu
//operator spread, aby nie podpinać każdej akcji z osobna
const mapDispatchToProps = {
    editLane,
    deleteLane: deleteLaneRequest,
    updateLane: updateLaneRequest,
    addNote: createNoteRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lane);

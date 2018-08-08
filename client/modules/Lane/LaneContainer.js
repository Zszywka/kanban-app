import { connect } from 'react-redux';
import Lane from './Lane';
//zaimportować wszystkie kreatory akcji linii oraz akcję tworzenia notek
import * as laneActions from './LaneActions';
import { createNote } from '../Note/NoteActions';

//podpiecie stanu
//Wykorzystujemy tutaj propsy, które zostały przekazane do komponentu pojedynczej linii.
//Następnie wyciągamy z nich identyfikatory notek znajdujące się w pojedynczej linii,
//a później szukamy odpowiedniej notki po jej identyfikatorze
const mapStateToProps = (state, ownProps) => {
  return {
    laneNotes: ownProps.lane.notes.map(noteId => state.notes.find(note => note.id === noteId))
  };
};

//podpiąć zaimportowane kreatory do propsów komponentu
//operator spread, aby nie podpinać każdej akcji z osobna
const mapDispatchToProps = {
  ...laneActions,
//Podpinamy go do callbacka addNote, bo tak się nazywa w komponencie Lane
  addNote: createNote,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lane);

//kontener dla listy notatek
//Każdą z nich będzie można edytować oraz usuwać (dodawanie notek -z pomocą kontenera Lane)
import { connect } from 'react-redux';
import Notes from './Notes';
import * as noteActions from '../Note/NoteActions';

//potrzebujemy tylko kreatorów akcji obsługujących edycję oraz usuwanie notki,
// dlatego właśnie wykorzystujemy operator spread.
const mapDispatchToProps = {
  ...noteActions,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);

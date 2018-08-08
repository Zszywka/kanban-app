// Import Actions
import { CREATE_LANE, UPDATE_LANE, DELETE_LANE, EDIT_LANE } from './LaneActions';
import { CREATE_NOTE, DELETE_NOTE } from '../Note/NoteActions';

// Initial State
const initialState = {};

export default function lanes(state = initialState, action) {
  switch (action.type) {
    //dodawanie nowych lini(dolaczenie elementu do tablicy)
    case CREATE_LANE:
      return [...state, action.lane];

//Używamy tutaj Object.assign, aby połączyć wartości z 3 obiektów (wliczając też pierwszy, pusty obiekt)
    // case UPDATE_LANE:
    //   return state.map(lane => {
    //     if (lane.id === action.id) {
    //       return Object.assign({}, lane, action.lane);
    //     }
    //     return lane;
    //   });
  //to samo co wyzej dzieki ternary operator(? :)
    case UPDATE_LANE:
      return state.map(lane => {
        return lane.id === action.id ? { ...lane, ...action.lane } : lane;
      });
//usiniecie calej lini
    case DELETE_LANE:
      return state.filter(lane => lane.id !== action.laneId);
//dodanie notatki
    case CREATE_NOTE:
    //mapujemy nasz stan (czyli tablicę linii)
      return state.map(lane => {
//jeśli id naszej linii to ten, który przekazaliśmy w akcji,to znaczy,
//że do niej właśnie chcemy dodać notkę,
        if (lane.id === action.laneId) {
//za pomocą spread operatora tworzymy nową tablicę identyfikatorów notek z dodanym id nowej notki
          const notes = [...lane.notes, action.note.id];
          //zwracamy nową linię również korzystając ze spreada dla obiektów,
          return { ...lane, notes };
        }
//jeśli akcja nie dotyczy tej linii, to niczego z nią nie robimy — zwracamy taką, jak była.
        return lane;
      });

    case DELETE_NOTE:
      return state.map(lane => {
        if (lane.id === action.laneId) {
          const notes = [...lane.notes];
          return notes.filter((note) => note.id !== action.noteId);
        }
        return lane;
      });

    case EDIT_LANE:
      const lane = { ...state[action.laneId], editing: true };
      return { ...state, [action.laneId]: lane };

    default:
      return state;
    }
}

export default LaneReducer;

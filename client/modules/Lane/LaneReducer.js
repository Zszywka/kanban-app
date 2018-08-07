// Import Actions
import { CREATE_LANE, UPDATE_LANE, DELETE_LANE } from './LaneActions';

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

    default:
      return state;
    }
}

export default LaneReducer;

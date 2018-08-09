import uuid from 'uuid';
//dodawanie, usuwanie oraz aktualizowanie linii znajdujących się w storze
import callApi from '../../util/apiCaller';
//zaimportować funkcję normalize oraz schemat, na podstawie którego chcemy
//dokonać normalizacji danych:
import { lanes } from '../../util/schema';
import { normalize } from 'normalizr';
 // Export Constants
export const CREATE_LANE = 'CREATE_LANE';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const EDIT_LANE = 'EDIT_LANE';
export const CREATE_LANES = 'CREATE_LANES';

//kreatorów tych akcji dla linii
// Export Actions
export function createLane(lane) {
  return {
    type: CREATE_LANE,
    lane: {
      id: uuid(),
      notes: [],
      ...lane,
    }
  };
}

 export function updateLane(lane) {
  return {
    type: UPDATE_LANE,
    lane,
  };
}

 export function deleteLane(laneId) {
  return {
    type: DELETE_LANE,
    laneId
  };
}

export function editLane(laneId) {
  return {
    type: EDIT_LANE,
    laneId
  };
}
//zaimplementowanego tego kreatora
export function createLanes(lanesData) {
    return {
        type: CREATE_LANES,
        lanes: lanesData,
    };
}
//po pobraniu wszystkich linii musimy wywołać kreator akcji createLanes,
// aby na podstawie danych pobranych z serwera stworzyć wszystkie linie
export function fetchLanes() {
  return (dispatch) => {
    return callApi('lanes').then(res => {
      const normalized = normalize(res.lanes, lanes);
      const {lanes: normalizedLanes} = normalized.entities;
//Następnie w funkcji fetchLanes musimy podmienić zwracane dane na znormalizowaną postać:
      dispatch(createLanes(normalizedLanes));
    });
  };
}
}

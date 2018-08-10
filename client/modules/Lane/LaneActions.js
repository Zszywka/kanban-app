//dodawanie, usuwanie oraz aktualizowanie linii znajdujących się w storze
import callApi from '../../util/apiCaller';
//zaimportować funkcję normalize oraz schemat, na podstawie którego chcemy
//dokonać normalizacji danych:
import { lanes } from '../../util/schema';
import { normalize } from 'normalizr';
import { createNotes } from '../Note/NoteActions';

 // Export Constants
export const CREATE_LANE = 'CREATE_LANE';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const EDIT_LANE = 'EDIT_LANE';
export const CREATE_LANES = 'CREATE_LANES';
export const FETCH_LANES = "FETCH_LANES";

//kreatorów tych akcji dla linii

// Export Actions
export function createLane(lane) {
  return {
    type: CREATE_LANE,
    lane: {
      notes: [],
      ...lane,
    }
  };
}
//id od servera przyjdzie
//będzie wykonywał request do serwera, a następnie tworzył nową linię w storze
//nowo utworzoną linię dodajmy do store'a dopiero, gdy dostaniemy odpowiedź z serwera
//Nasza odpowiedź to nowo utworzona linia
//Po utworzeniu nowej linii zwraca on nam obiekt linii, który przekazujemy
// jako parametr do kreatora createLane
//callApi wywołujemy z3 argumentami. Oprócz endpointa (pierwszy argument),
// metoda, jaką komunikujemy się z serwerem ('post') oraz ciało zapytania (lane)
export function createLaneRequest(lane) {
  return (dispatch) => {
    return callApi('lanes', 'post', lane).then(res => {
      dispatch(createLane(res));
    });
  };
}

 export function updateLane(lane) {
  return {
    type: UPDATE_LANE,
    lane,
  };
}

export function updateLaneRequest(lane) {
	return dispatch => {
		return callApi(`lanes/${lane.id}`, "put", lane).then(() => {
			dispatch(updateLane(lane));
		});
	};
}

 export function deleteLane(laneId) {
  return {
    type: DELETE_LANE,
    laneId
  };
}

export function deleteLaneRequest(laneId) {
	return dispatch => {
		return callApi(`lanes/${laneId}`, "delete").then(() => {
			dispatch(deleteLane(laneId));
		});
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
    return (dispatch) => {
      return (dispatch) => {
        const normalized = normalize(res.lanes, lanes);
        const { lanes: normalizedLanes, notes } = normalized.entities;
        dispatch(createLanes(normalizedLanes));
        dispatch(createNotes(notes));
      }
    };
}
//po pobraniu wszystkich linii musimy wywołać kreator akcji createLanes,
// aby na podstawie danych pobranych z serwera stworzyć wszystkie linie
export function fetchLanes() {
  return (dispatch) => {
    return callApi('lanes').then(res => {
      const normalized = normalize(res.lanes, lanes);
      const {lanes: normalizedLanes} = normalized.entities;
//Następnie w funkcji fetchLanes musimy podmienić zwracane dane na znormalizowaną postać:o
      dispatch(createLanes(normalizedLanes));
      dispatch(createNotes(notes));
    });
  };
}

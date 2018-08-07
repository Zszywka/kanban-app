import uuid from 'uuid';
//dodawanie, usuwanie oraz aktualizowanie linii znajdujących się w storze
 // Export Constants
export const CREATE_LANE = 'CREATE_LANE';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';

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

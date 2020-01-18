import {
  ADD_CABLE,
  UPDATE_CABLE,
  COPY_CABLE,
  DELETE_CABLE,
  CableActionTypes,
  SET_CABLES,
  Cable,
} from './types'

export function addCable(): CableActionTypes {
  return { type: ADD_CABLE }
}

export function updateCable(cable: Cable): CableActionTypes {
  return { type: UPDATE_CABLE, cable }
}

export function copyCable(id: Cable['id']): CableActionTypes {
  return { type: COPY_CABLE, id }
}

export function deleteCable(id: Cable['id']): CableActionTypes {
  return { type: DELETE_CABLE, id }
}

export function setCables(cables: Array<Cable>): CableActionTypes {
  return { type: SET_CABLES, cables }
}

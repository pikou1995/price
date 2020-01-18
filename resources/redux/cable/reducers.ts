import {
  CableActionTypes,
  ADD_CABLE,
  UPDATE_CABLE,
  DELETE_CABLE,
  COPY_CABLE,
  CableState,
  SET_CABLES,
  defaultCable,
  Cable,
} from './types'

const initialState: CableState = {
  cables: [],
}
const genId = () => +new Date()

export function cableReducer(
  state = initialState,
  action: CableActionTypes
): CableState {
  const { cables } = state
  switch (action.type) {
    case ADD_CABLE:
      return {
        cables: [
          ...cables,
          {
            ...defaultCable,
            id: genId(),
          },
        ],
      }
    case UPDATE_CABLE: {
      const { cable } = action
      return {
        cables: cables.map((c: Cable) => {
          if (c.id === cable.id) {
            return { ...c, ...cable }
          }
          return c
        }),
      }
    }
    case COPY_CABLE:
      return {
        cables: [
          ...cables,
          {
            ...cables.find((c: Cable) => c.id === action.id),
            id: genId(),
          },
        ],
      }
    case DELETE_CABLE:
      return {
        cables: cables.filter((c: Cable) => c.id !== action.id),
      }
    case SET_CABLES:
      return {
        cables: action.cables,
      }
    default:
      return state
  }
}

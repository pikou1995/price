import axios from 'axios'
import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

export type Model = {
  model: string
  spec: string
  iw: number
  sw?: number
  oscr?: number
}

export type ModelState = {
  models: Array<Model>
  modelsLoaded: boolean
}

export const SET_MODELS = 'SET_MODELS'

interface SetModelsAction {
  type: typeof SET_MODELS
  models: Array<Model>
}

export type ModelActionTypes = SetModelsAction

export function setModels(models: Array<Model>): ModelActionTypes {
  return { type: SET_MODELS, models }
}

type ThunkResult<R> = ThunkAction<R, ModelState, undefined, ModelActionTypes>

export function fetchModels(): ThunkResult<Promise<void>> {
  return async function(dispatch) {
    const res = await axios.get('/api/models')
    dispatch(setModels(res.data))
  }
}

const initialState: ModelState = {
  models: [],
  modelsLoaded: false,
}

export function modelReducer(
  state = initialState,
  action: ModelActionTypes
): ModelState {
  switch (action.type) {
    case SET_MODELS:
      return {
        models: action.models,
        modelsLoaded: true,
      }
    default:
      return state
  }
}

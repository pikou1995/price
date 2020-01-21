import axios from 'axios'
import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { ThunkResult } from '.'

export type Log = {
  time: number
  page: string
  userAgent: string
}

export type LogState = {
  logs: Log[]
  total: number
  page: number
  pageSize: number
  loading: boolean
  loaded: boolean
}

export const SET_LOGS = 'SET_LOGS'
export const SET_LOADING = 'SET_LOADING'

interface SetLogsAction {
  type: typeof SET_LOGS
  logs: Log[]
  page: number
  pageSize: number
  total: number
}

interface SetLoadingAction {
  type: typeof SET_LOADING
  loading: boolean
}

export type LogActionTypes = SetLogsAction | SetLoadingAction

export function setLogs(
  logs: Log[],
  total: number,
  page: number,
  pageSize: number
): LogActionTypes {
  return { type: SET_LOGS, logs, total, page, pageSize }
}

export function setLoading(loading: boolean): LogActionTypes {
  return { type: SET_LOADING, loading }
}

export function fetchLogs(page = 1, pageSize = 10): ThunkResult<Promise<void>> {
  return async function(dispatch) {
    dispatch(setLoading(true))
    const res = await axios.get('/api/logs', {
      params: { page, pageSize },
    })

    const { logs, total } = res.data
    dispatch(setLogs(logs, total, page, pageSize))
  }
}

const initialState: LogState = {
  logs: [],
  total: 0,
  page: 1,
  pageSize: 10,
  loaded: false,
  loading: false,
}

export function logReducer(state = initialState, action: LogActionTypes) {
  switch (action.type) {
    case SET_LOGS:
      return {
        logs: action.logs,
        page: action.page,
        pageSize: action.pageSize,
        total: action.total,
        loaded: true,
        loading: false,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      }
    default:
      return state
  }
}

const { axios } = window
export const SET_LOGS = 'SET_LOGS'
export const SET_LOADING = 'SET_LOADING'

export function setLogs(logs, total, page, pageSize) {
  return { type: SET_LOGS, logs, total, page, pageSize }
}

export function setLoading(loading) {
  return { type: SET_LOADING, loading }
}

export function fetchLogs(page, pageSize = 10) {
  return function(dispatch) {
    dispatch(setLoading(true))
    axios
      .get('/api/logs', {
        params: { page, pageSize },
      })
      .then(res => {
        const { logs, total } = res.data
        dispatch(setLogs(logs, total, page, pageSize))
      })
  }
}

const initialState = { logs: [], page: 1, pageSize: 10 }

export function logsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGS:
      return {
        ...state,
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

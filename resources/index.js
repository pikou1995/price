const { ReactDOM, axios } = window
import App from './app'

location.pathname !== '/logs' &&
  axios.post('/api/logs', {
    log: `[${new Date().toLocaleString()}]${navigator.userAgent}`,
  })

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(<App />, root)

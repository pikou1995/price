const { ReactDOM, axios } = window
import App from './app'
;(function() {
  const path = location.pathname
  path !== '/logs' &&
    axios.post('/api/logs', {
      time: new Date().getTime(),
      path,
      userAgent: navigator.userAgent,
    })
})()

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(<App />, root)

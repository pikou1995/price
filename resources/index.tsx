import axios from 'axios'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './app'
;(function() {
  const path = location.pathname
  ;/^\/logs\/?$/.test(path) ||
    axios.post('/api/logs', {
      time: new Date().getTime(),
      path,
      userAgent: navigator.userAgent,
    })
})()

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(<App />, root)

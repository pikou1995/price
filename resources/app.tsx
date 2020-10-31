import React, { lazy, Suspense } from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom'
import { message, Spin } from 'antd'
import { Provider } from 'react-redux'
import store from './redux'
import Calculator from './containers/calculator'
const Model = lazy(
  () =>
    import(
      /* webpackChunkName: "table" */
      /* webpackPrefetch: true */
      './containers/model'
    )
)
const Setting = lazy(
  () =>
    import(
      /* webpackChunkName: "form" */
      /* webpackPrefetch: true */
      './containers/setting'
    )
)
import TopMenu from './components/top-menu'
import Footer from './components/footer'

message.config({
  top: 100,
  duration: 2,
})

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <TopMenu />
        <Switch>
          <Route path="/model">
            <Suspense fallback={<Spin />}>
              <Model />
            </Suspense>
          </Route>
          <Route path="/setting">
            <Suspense fallback={<Spin />}>
              <Setting />
            </Suspense>
          </Route>
          <Route path={['/:id', '/']}>
            <Calculator />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </Provider>
  )
}

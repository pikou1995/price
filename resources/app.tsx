import React, { lazy, Suspense } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { message, Spin } from 'antd'
import TopMenu from './pages/components/top-menu'
import Footer from './pages/components/footer'
import Calculator from './pages/calculator'
const Model = lazy(
  () =>
    import(
      /* webpackChunkName: "table" */
      /* webpackPrefetch: true */
      './pages/model'
    )
)
const Setting = lazy(
  () =>
    import(
      /* webpackChunkName: "form" */
      /* webpackPrefetch: true */
      './pages/setting'
    )
)

message.config({
  top: 100,
  duration: 2,
})

export default function App() {
  return (
    <div>
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
    </div>
  )
}

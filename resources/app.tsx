import * as React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom'
import { Menu, message } from 'antd'
import { Provider } from 'react-redux'
import store from './redux'
import Calculator from './containers/calculator'
const Model = React.lazy(() => import('./containers/model'))
const Setting = React.lazy(() => import('./containers/setting'))
import Footer from './components/footer'
import { CalculatorOutlined, SettingOutlined, TagsOutlined } from '@ant-design/icons'

message.config({
  top: 100,
  duration: 2,
})

const PATHS = ['/history', '/model', '/setting']

function TopMenu() {
  const { pathname } = useLocation()
  const key = PATHS.indexOf(pathname) === -1 ? '/' : pathname

  return (
    <Menu mode="horizontal" selectedKeys={[key]}>
      <Menu.Item key="/">
        <Link to="/">
          <CalculatorOutlined />
          计算器
        </Link>
      </Menu.Item>
      <Menu.Item key="/model">
        <Link to="/model">
          <TagsOutlined />
          型号参考
        </Link>
      </Menu.Item>
      <Menu.Item key="/setting">
        <Link to="/setting">
          <SettingOutlined />
          设置
        </Link>
      </Menu.Item>
    </Menu>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <TopMenu />
        <Switch>
          <Route path="/model">
            <Model />
          </Route>
          <Route path="/setting">
            <Setting />
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

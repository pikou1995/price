const { ReactRouterDOM, antd, ReactRedux } = window
const { BrowserRouter: Router, Switch, Route, Link } = ReactRouterDOM
const { Provider } = ReactRedux
const { Menu, Icon } = antd
import store from './redux'
import Calculator from './containers/calculator'
import History from './containers/history'
import Model from './containers/model'
import Setting from './containers/setting'

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Menu mode="horizontal" defaultSelectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/">
              <Icon type="calculator" />
              计算器
            </Link>
          </Menu.Item>
          <Menu.Item key="/history">
            <Link to="/history">
              <Icon type="history" />
              历史记录
            </Link>
          </Menu.Item>
          <Menu.Item key="/model">
            <Link to="/model">
              <Icon type="tags" />
              型号管理
            </Link>
          </Menu.Item>
          <Menu.Item key="/setting">
            <Link to="/setting">
              <Icon type="setting" />
              设置
            </Link>
          </Menu.Item>
        </Menu>
        <Switch>
          <Route path="/history">
            <History />
          </Route>
          <Route path="/model">
            <Model />
          </Route>
          <Route path="/setting">
            <Setting />
          </Route>
          <Route path="/">
            <Calculator />
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

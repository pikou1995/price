const { ReactRouterDOM, antd, ReactRedux } = window
const {
  BrowserRouter: Router,
  Switch,
  Route,
  Link,
  useParams,
  useLocation,
} = ReactRouterDOM
const { Provider } = ReactRedux
const { Menu, Icon } = antd
import store from './redux'
import Calculator from './containers/calculator'
import History from './containers/history'
import Model from './containers/model'
import Setting from './containers/setting'

const PATHS = ['/history', '/model', '/setting']

function TopMenu() {
  const { pathname } = useLocation()
  const key = PATHS.indexOf(pathname) === -1 ? '/' : pathname

  return (
    <Menu mode="horizontal" selectedKeys={[key]}>
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
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <TopMenu />
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
          <Route path={['/:id', '/']}>
            <Calculator />
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

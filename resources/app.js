const { ReactRouterDOM, antd } = window
const {
    BrowserRouter: Router,
    Switch,
    Route,
    Link,
} = ReactRouterDOM
const { Menu, Icon } = antd
import Calculator from './calculator'
import History from './history'
import Setting from './setting'

export default function App() {
    return (
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
                <Menu.Item key="/setting">
                    <Link to="/setting">
                        <Icon type="setting" />
                        配置
                    </Link>
                </Menu.Item>
            </Menu>
            <Switch>
                <Route path="/history">
                    <History />
                </Route>
                <Route path="/setting">
                    <Setting />
                </Route>
                <Route path="/">
                    <Calculator />
                </Route>
            </Switch>
        </Router>
    )
}
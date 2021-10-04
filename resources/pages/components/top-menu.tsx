import React from 'react'
import {
  CalculatorOutlined,
  SettingOutlined,
  TagsOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'

export default function TopMenuComponent() {
  const { pathname } = useLocation()

  return (
    <Menu mode="horizontal" selectedKeys={[pathname]}>
      <Menu.Item key="/">
        <Link to="/">
          <CalculatorOutlined /> 计算器
        </Link>
      </Menu.Item>
      <Menu.Item key="/model">
        <Link to="/model">
          <TagsOutlined /> 型号参考
        </Link>
      </Menu.Item>
      <Menu.Item key="/setting">
        <Link to="/setting">
          <SettingOutlined /> 设置
        </Link>
      </Menu.Item>
    </Menu>
  )
}

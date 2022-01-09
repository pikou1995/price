import React from 'react'
import { message } from 'antd'
import Footer from './pages/components/footer'
import Cables from './pages/cables'
import { observer } from 'mobx-react'
import Layout, { Content } from 'antd/lib/layout/layout'

message.config({
  top: 100,
  duration: 2,
})

export default observer(function App() {
  return (
    <Layout>
      <Content style={{ margin: 16 }}>
        <Cables />
      </Content>
      <Footer />
    </Layout>
  )
})

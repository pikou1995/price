import { Button, Col, Row } from 'antd'
import React, { Key } from 'react'
const KEYBOARD = [
  '7',
  '8',
  '9',
  '<-',
  '4',
  '5',
  '6',
  'c',
  '1',
  '2',
  '3',
  '/',
  '0',
  '.',
  '/1000',
  '*',
  '*0.014',
  '*0.0136',
  '*3.14',
  '切换',
]

interface KeyboardProps {
  onClick: (key: string) => void
}

export default function Keyboard({ onClick }: KeyboardProps) {
  return (
    <Row>
      {KEYBOARD.map((key) => (
        <Col span="6" key={key}>
          <Button className="key" onClick={() => onClick(key)}>
            {key}
          </Button>
        </Col>
      ))}
    </Row>
  )
}

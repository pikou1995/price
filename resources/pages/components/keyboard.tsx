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
]

interface KeyboardProps {
  onClick: (key: string) => void
}

export default function Keyboard({ onClick }: KeyboardProps) {
  return (
    <Row>
      {KEYBOARD.map((key) => (
        <Col span="6">
          <Button className="key" onClick={() => onClick(key)}>
            {key}
          </Button>
        </Col>
      ))}
    </Row>
  )
}

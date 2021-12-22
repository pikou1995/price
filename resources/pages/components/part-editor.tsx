import { Form, Input, FormInstance, Radio, Row, Col, Button } from 'antd'
import { observer } from 'mobx-react'
import React, { RefObject } from 'react'
import { Part } from '@/store/cable'
import './part-editor.css'

const PART_LABELS = [
  'CU',
  'TCU',
  '五类线半成品(屏蔽)',
  '五类线半成品(非屏蔽)',
  '六类线半成品(屏蔽)',
  '六类线半成品(非屏蔽)',
  'PE',
  'XLPE',
  '云母带(单)',
  '云母带(双)',
  'PVC',
  'LSOH',
  'BS7655',
  '铝总',
  '铝单',
  '排流线',
  'SWA(0.9)',
  'SWA(1.25)',
  'SWA(1.6)',
  'SWA(2.0)',
  '镀锡铜编织',
  '内',
  '外',
  '阻燃带',
]

const CUSTOM_LABEL_KEY = Symbol('custom')
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

interface PartEditorProps {
  formRef: RefObject<FormInstance>
  onOk?: () => void
}

export default observer(function PartEditor({
  formRef,
  onOk,
}: PartEditorProps) {
  const [form] = Form.useForm<Part & { customLabel?: string }>()

  function handleInput(key: string) {
    let formula = form.getFieldValue('formula')
    switch (key) {
      case '<-': {
        formula = formula.slice(0, -1)
        break
      }
      case 'c': {
        form.resetFields(['formula', 'computedValue', 'inputValue'])
        return
      }
      default: {
        formula += key
        if (/[*/]{2,}/.test(formula)) {
          return
        }
      }
    }
    form.setFieldsValue({ formula })
    if (!/(\*|\/)$/.test(formula)) {
      const computedValue = String(eval(formula || 0))
      form.setFieldsValue({ computedValue })
    }
  }

  return (
    <div>
      <Form form={form} ref={formRef}>
        <Form.Item name="label" rules={[{ required: true }]}>
          <Radio.Group>
            {PART_LABELS.map((value) => (
              <Radio value={value}>{value}</Radio>
            ))}
            <Radio value={CUSTOM_LABEL_KEY}>自定义</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.label !== currentValues.label
          }
        >
          {({ getFieldValue }) =>
            getFieldValue('label') === CUSTOM_LABEL_KEY ? (
              <Form.Item name="customLabel">
                <Input
                  size="large"
                  placeholder="请输入自定义组件名"
                  autoFocus
                />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item name="formula" initialValue="" rules={[{ required: true }]}>
          <Input size="large" placeholder="请输入计算公式" />
        </Form.Item>
        <Form.Item name="computedValue" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.formula !== currentValues.formula
          }
        >
          {({ getFieldValue }) => (
            <Form.Item name="inputValue">
              <Input
                size="large"
                placeholder={`自动计算价格:${
                  getFieldValue('computedValue') || '0'
                }`}
                onPressEnter={onOk}
              />
            </Form.Item>
          )}
        </Form.Item>
      </Form>
      <Row>
        {KEYBOARD.map((key) => (
          <Col span="6">
            <Button className="key" onClick={() => handleInput(key)}>
              {key}
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  )
})

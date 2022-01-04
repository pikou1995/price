import { Form, Input, FormInstance, Radio, Row, Col, Button } from 'antd'
import { observer } from 'mobx-react'
import React, { RefObject, useState } from 'react'
import { Part } from '@/store/cable'
import Keyboard from './keyboard'
import './part-editor.css'

const PART_LABELS = [
  'CU',
  'TCU',
  '镀银铜',
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
  'PTFE聚四氟乙烯(11w/t)',
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

const CUSTOM_LABEL_KEY = 'CUSTOM_LABEL_KEY'

interface PartEditorProps {
  formRef: RefObject<FormInstance>
  onOk?: () => void
}

export default observer(function PartEditor({
  formRef,
  onOk,
}: PartEditorProps) {
  const [form] = Form.useForm<Part & { customLabel?: string }>()
  const [inputTarget, setTarget] = useState<'formula' | 'inputValue'>('formula')

  function handleFormulaInput(key: string) {
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
      case '.': {
        formula += /\d$/.test(formula) ? '.' : '0.'
        break
      }
      default: {
        formula += key
        if (/[*/]{2,}/.test(formula)) {
          return
        }
      }
    }
    formula = updateFormula(formula)
    setTimeout(() => {
      form.getFieldInstance('formula').focus({ cursor: 'end' })
    })
  }

  function updateFormula(formula: string) {
    formula = formula.replace(/[^\d.*/]/g, '')
    form.setFieldsValue({ formula })
    if (!/(\*|\/)$/.test(formula)) {
      const computedValue = String(eval(formula || '0'))
      form.setFieldsValue({ computedValue })
    }
    return formula
  }

  function handleInputValueInput(key: string) {
    let inputValue = form.getFieldValue('inputValue')
    switch (key) {
      case '<-': {
        inputValue = inputValue.slice(0, -1)
        break
      }
      case 'c': {
        form.resetFields(['inputValue'])
        return
      }
      default: {
        inputValue += key
      }
    }
    form.setFieldsValue({ inputValue: inputValue.replace(/[^\d.]/g, '') })
    setTimeout(() => {
      form.getFieldInstance('inputValue').focus({ cursor: 'end' })
    })
  }

  return (
    <div>
      <Form form={form} ref={formRef}>
        <Form.Item name="label" rules={[{ required: true }]}>
          <Radio.Group>
            {PART_LABELS.map((value) => (
              <Radio key={value} value={value}>
                {value}
              </Radio>
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
          <Input
            size="large"
            placeholder="请输入计算公式"
            onFocus={() => setTarget('formula')}
            onChange={(e) => {
              updateFormula(e.target.value)
            }}
          />
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
                autoComplete="off"
                size="large"
                placeholder={`自动计算价格:${
                  getFieldValue('computedValue') || '0'
                }`}
                onFocus={() => setTarget('inputValue')}
                onPressEnter={onOk}
              />
            </Form.Item>
          )}
        </Form.Item>
      </Form>
      <Keyboard
        onClick={(key) => {
          if (key === '切换') {
            setTarget(inputTarget === 'formula' ? 'inputValue' : 'formula')
            return
          }
          inputTarget === 'formula'
            ? handleFormulaInput(key)
            : handleInputValueInput(key)
        }}
      ></Keyboard>
    </div>
  )
})

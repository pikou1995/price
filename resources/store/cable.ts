import { accAdd } from '@/utils'
import { flow, makeAutoObservable } from 'mobx'

export interface Part {
  id: number
  label: string
  formula: string
  // 自动计算的值，仅供参考
  computedValue: string
  // 手动修正的值
  inputValue: string
}

export class Cable {
  constructor(public readonly id: number) {
    makeAutoObservable(this)
  }

  spec = ''
  parts: Part[] = []

  setSpec(spec: string) {
    this.spec = spec
  }

  addPart = flow(function* (this: Cable, part: Part) {
    const { id } = yield fetch('/api/parts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...part,
        cid: this.id,
      }),
    })
    part.id = id
    this.parts.push(part)
  })

  delPart = flow(function* (this: Cable, part: Part) {
    yield fetch(`/api/parts/${part.id}`, { method: 'DELETE' })
    this.parts = this.parts.filter((p) => p !== part)
  })

  get value() {
    return this.parts.reduce(
      (v, { computedValue, inputValue }) =>
        accAdd(Number(inputValue || computedValue), v),
      0
    )
  }

  /**
   * 序列化后恢复成 reactive
   * @param cable
   */
  restore(cable: Cable) {
    Object.assign(this, cable)
    return this
  }
}

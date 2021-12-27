import { accAdd } from '@/utils'
import { makeAutoObservable } from 'mobx'
import { RootStore } from '.'

export interface Part {
  label: string
  formula: string
  // 自动计算的值，仅供参考
  computedValue: string
  // 手动修正的值
  inputValue: string
}

export class Cable {
  readonly id = Date.now()

  spec = ''
  parts: Part[] = []

  setSpec(spec: string) {
    this.spec = spec
  }

  addPart(part: Part) {
    this.parts.push(part)
  }

  delPart(part: Part) {
    this.parts = this.parts.filter((p) => p !== part)
  }

  get value() {
    return this.parts.reduce(
      (v, { computedValue, inputValue }) =>
        accAdd(Number(inputValue || computedValue), v),
      0
    )
  }

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this)
  }

  /**
   * 复制一样的属性，id 除外
   */
  clone() {
    const { id, ...cable } = this
    return Object.assign(new Cable(this.rootStore), cable)
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

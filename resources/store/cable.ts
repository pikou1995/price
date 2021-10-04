import { makeAutoObservable, observable } from 'mobx'
import { RootStore } from '.'
import { CableReport } from './report'

export type CoreType = 'CU' | 'TC'
export type Insulation = 'XLPE' | 'PVC' | 'PE' | 'WDZ' | 'BS7655'
export type Sheath = 'WDZ' | 'PVC' | 'EPDM' | 'AB隔氧层料' | 'BS7655'
export type SWA = '0.9' | '1.25' | '1.6' | '2'
export type Material =
  | Sheath
  | CoreType
  | Insulation
  | 'STEEL'
  | 'AL'
  | 'mica'
  | 'waterBlockingTape'

type PriceKeys =
  | 'coreWeights'
  | 'insulationWeights'
  | 'braidedWeights'
  | 'sheathWeights'
  | 'innerSheathWeights'
  | 'iscrWeights'
  | 'oscrWeights'

type PriceFields = Record<PriceKeys, string[]>

export class Cable {
  readonly id = Date.now()

  coreType: CoreType = 'CU'
  coreArea?: string = undefined
  /** 绝缘材料 */
  insulation: Insulation = 'XLPE'
  /** 阻水带单位重量 */
  waterBlockingTape?: string = undefined
  /** 编织带 */
  braided?: CoreType = undefined
  iscr = false
  oscr = false
  iDrainWire?: string = undefined
  drainWire?: string = undefined
  /** 钢丝铠装直径 */
  diameter?: string = undefined
  sheath?: Sheath = 'WDZ'
  pair = false
  coreNum?: string = undefined
  /** 云母带 */
  mica: 0 | 1 | 2 = 0
  /** 钢丝铠装 */
  swa: 0 | SWA = 0
  /** 内护套 */
  innerSheath: 0 | Sheath = 0

  readonly report: CableReport

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this)
    this.report = new CableReport(this, rootStore.priceConfig!)
  }

  /**
   * 一般用作 priceConfig 中的 key
   */
  get key() {
    return `${this.coreNum || ''}*${this.pair ? '2*' : ''}${
      this.coreArea || ''
    }`
  }

  genPriceFields(): PriceFields {
    const coreWeights: string[] = []
    const insulationWeights: string[] = []
    const braidedWeights: string[] = []
    const sheathWeights: string[] = []
    const innerSheathWeights: string[] = []
    const iscrWeights: string[] = []
    const oscrWeights: string[] = []

    const { coreNum, coreArea, braided, innerSheath, iscr, oscr, key } = this

    if (coreNum && coreArea) {
      coreWeights.push(coreArea)
      // 绝缘重量
      insulationWeights.push(coreArea)
      // 外护套重量
      sheathWeights.push(key)

      if (braided) {
        braidedWeights.push(key)
      }

      if (innerSheath) {
        innerSheathWeights.push(key)
      }

      iscr && iscrWeights.push(key)
      oscr && oscrWeights.push(key)
    }

    return {
      coreWeights,
      insulationWeights,
      braidedWeights,
      iscrWeights,
      oscrWeights,
      innerSheathWeights,
      sheathWeights,
    }
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

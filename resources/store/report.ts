import { DENSITY, SWA_WASTE } from '@/config'
import { makeAutoObservable } from 'mobx'
import { Cable } from './cable'
import { PriceConfig } from './price-config'

export interface CalculationFields<T> {
  corePrice: T
  micaPrice: T
  insulationPrice: T
  waterBlockingTapePrice: T
  braidedPrice: T
  iscrPrice: T
  iDrainWirePrice: T
  oscrPrice: T
  drainWirePrice: T
  innerSheathPrice: T
  swaPrice: T
  sheathPrice: T
}

export class CableReport {
  constructor(private cable: Cable, private priceConfig: PriceConfig) {
    makeAutoObservable(this)
  }

  private logs: CalculationFields<string[]> = {
    corePrice: [],
    micaPrice: [],
    insulationPrice: [],
    waterBlockingTapePrice: [],
    braidedPrice: [],
    iscrPrice: [],
    iDrainWirePrice: [],
    oscrPrice: [],
    drainWirePrice: [],
    innerSheathPrice: [],
    swaPrice: [],
    sheathPrice: [],
  }

  private toFixed(p: number, num = 2) {
    return isNaN(p) ? '' : p.toFixed(num)
  }

  private segmentedPrice(price: number) {
    return price
      ? [1.1, 1.15, 1.2, 1.25, 1.3]
          .map((r) => this.toFixed(r * price))
          .join('/')
      : ''
  }

  getLog(field: keyof CalculationFields<string[]>): string[] {
    return this.logs[field]
  }

  private setLog(
    field: keyof CalculationFields<string[]>,
    log: string[]
  ): void {
    this.logs[field] = log
  }

  get id(): number {
    return this.cable.id
  }

  get type(): string {
    return this.cable.key
  }

  get corePrice(): string {
    const { coreNum, coreArea, coreType, pair } = this.cable
    const { material, coreWeight = {} } = this.priceConfig

    if (!coreNum || !coreArea) {
      return '0'
    }
    const log: string[] = []

    const weight = coreWeight[coreArea] || 0

    log.push(`${coreType}单位重量 = ${weight}`)

    const unitP = (weight * material[coreType]).toFixed(2)

    log.push(
      `单位价格(${unitP}) = ↸(${weight}) * ${coreType}单价(${material[coreType]})`
    )

    const p = this.toFixed(+coreNum * +unitP * (pair ? 2 : 1))

    log.push(
      `总价(${p}) = ${pair ? `${coreNum}对` : `数量(${coreNum})`} * ↸(${unitP})`
    )

    this.setLog('corePrice', log)

    return p
  }

  get micaPrice(): string {
    const { coreNum, mica } = this.cable
    const { material } = this.priceConfig
    if (mica === 0 || !coreNum) {
      return '0'
    }

    const log: string[] = []

    log.push(`mica单价 = ${material.mica}`)

    const p = this.toFixed(+coreNum * mica * material.mica)

    log.push(`总价(${p}) = 数量(${coreNum}) * ${mica}层 * ↸(${material.mica})`)

    this.setLog('micaPrice', log)

    return p
  }

  get insulationPrice(): string {
    const { coreNum, coreArea, insulation, pair } = this.cable
    const { insulationWeight, material } = this.priceConfig

    if (!insulation || !coreArea || !coreNum) {
      return '0'
    }

    const log: string[] = []

    log.push(`${insulation}单位重量 = ${insulationWeight[coreArea]}`)

    const unitP = this.toFixed(
      insulationWeight[coreArea] * material[insulation]
    )

    log.push(
      `单位价格(${unitP}) = ↸(${insulationWeight[coreArea]}) * ${insulation}单价(${material[insulation]})`
    )

    const p = this.toFixed(+coreNum * +unitP * (pair ? 2 : 1))

    log.push(
      `总价(${p}) = ${pair ? `${coreNum}对` : `数量(${coreNum})`} * ↸(${unitP})`
    )

    this.setLog('insulationPrice', log)

    return p
  }

  get waterBlockingTapePrice(): string {
    const { waterBlockingTape } = this.cable
    const { material } = this.priceConfig
    if (!waterBlockingTape) {
      return '0'
    }

    const log: string[] = []

    log.push(`阻水带单位重量 = ${waterBlockingTape}`)

    const p = this.toFixed(
      Number(waterBlockingTape) * material.waterBlockingTape
    )

    log.push(
      `总价(${p}) = ↸(${[waterBlockingTape]}) * 阻水带单价(${
        material.waterBlockingTape
      })`
    )

    this.setLog('waterBlockingTapePrice', log)

    return p
  }

  get braidedPrice(): string {
    const { braided, coreNum, coreArea } = this.cable
    const { material, braidedWeight = {} } = this.priceConfig

    if (!braided || !coreNum || !coreArea) {
      return '0'
    }
    const log: string[] = []

    const weight = braidedWeight[this.type] || 0

    log.push(`${braided}单位重量 = ${weight}`)

    const p = this.toFixed(weight * material[braided])

    log.push(`总价(${p}) = ↸(${weight}) * ${braided}单价(${material[braided]})`)

    this.setLog('braidedPrice', log)

    return p
  }

  get iscrPrice(): string {
    const { coreNum, iscr } = this.cable
    const { material, iscrWeight } = this.priceConfig

    if (!iscr || !coreNum) {
      return '0'
    }

    const log: string[] = []

    log.push(`iscr单位重量 = ${iscrWeight[this.type]}`)

    const unitP = this.toFixed(material.AL * iscrWeight[this.type])
    log.push(
      `单位价格(${unitP}) = ↸(${iscrWeight[this.type]}) * 铝单价(${
        material.AL
      })`
    )

    const p = this.toFixed(+coreNum * +unitP)
    log.push(`总价(${p}) = 数量(${coreNum}) * ↸(${unitP})`)

    this.setLog('iscrPrice', log)

    return p
  }

  get oscrPrice(): string {
    const { oscr } = this.cable
    const { material, oscrWeight } = this.priceConfig

    if (!oscr) {
      return '0'
    }

    const log: string[] = []

    const weight = oscrWeight[this.type] || 0
    log.push(`oscr单位重量 = ${weight}`)

    const p = this.toFixed(material.AL * weight)
    log.push(`总价(${p}) = ↸(${weight}) * 铝单价(${material.AL})`)

    this.setLog('oscrPrice', log)

    return p
  }

  get iDrainWirePrice(): string {
    const { coreNum, iscr, iDrainWire } = this.cable
    const { material } = this.priceConfig

    if (!(iscr && iDrainWire) || !coreNum) {
      return '0'
    }

    const log: string[] = []

    const PI = 3.14
    log.push(`单排流线直径 = ${iDrainWire}`)

    const volume = this.toFixed(Math.pow(+iDrainWire / 2, 2) * PI)
    log.push(`排流线体积(${volume}): ↸(${iDrainWire} / 2) ^ 2 * 3.14`)

    const weight = this.toFixed(+volume * DENSITY.TC)
    log.push(`排流线重量(${weight}) = ↸(${volume}) * 镀锡铜密度(${DENSITY.TC})`)

    const unitP = this.toFixed(+weight * material.TC)
    log.push(`单位价格(${unitP}) = ↸(${weight}) * ${material.TC}`)

    const p = this.toFixed(+unitP * +coreNum)
    log.push(`总价(${p}) = 数量(${coreNum}) * ↸(${unitP})`)

    this.setLog('iDrainWirePrice', log)

    return p
  }

  get drainWirePrice(): string {
    const { coreNum, oscr, drainWire } = this.cable
    const { material } = this.priceConfig

    if (!(oscr && drainWire) || !coreNum) {
      return '0'
    }

    const log: string[] = []

    const PI = 3.14
    log.push(`总排流线直径 = ${drainWire}`)

    const volume = this.toFixed(Math.pow(+drainWire / 2, 2) * PI)
    log.push(`排流线体积(${volume}): ↸(${drainWire} / 2) ^ 2 * 3.14`)

    const weight = this.toFixed(+volume * DENSITY.TC)
    log.push(`排流线重量${weight} = ↸(${volume}) * 镀锡铜密度(${DENSITY.TC})`)

    const p = this.toFixed(+weight * material.TC)
    log.push(`总价${p} = ↸(${weight}) * 铝单价(${material.TC})`)

    this.setLog('drainWirePrice', log)

    return p
  }

  get innerSheathPrice(): string {
    const { innerSheath } = this.cable
    const { material, innerSheathWeight } = this.priceConfig
    if (innerSheath === 0) {
      return '0'
    }

    const log: string[] = []

    const weight = innerSheathWeight[this.type] || 0
    log.push(`${innerSheath}单位重量 = ${weight}`)

    const p = this.toFixed(weight * material[innerSheath])
    log.push(
      `总价(${p}) = ↸(${weight}) * ${innerSheath}单价(${material[innerSheath]})`
    )

    this.setLog('innerSheathPrice', log)

    return p
  }

  get swaPrice(): string {
    const { swa, diameter } = this.cable
    const { material, swaWeight } = this.priceConfig
    if (swa === 0 || !diameter) {
      return '0'
    }

    const log: string[] = []

    const PI = 3.14
    const num = this.toFixed((+diameter * PI) / +swa)
    log.push(`钢丝数量(${num}) = 直径(${diameter}) * ${PI} / 钢丝直径(${swa})`)

    const weight = this.toFixed(+num * SWA_WASTE * swaWeight[swa])
    log.push(
      `钢丝重量(${weight}) = ↸(${num}) * 绞距浪费(${SWA_WASTE}) * 钢丝单位重量(${swaWeight[swa]})`
    )

    const p = this.toFixed(+weight * material.STEEL)
    log.push(`总价(${p}) = ↸(${weight}) * 钢单价(${material.STEEL})`)

    this.setLog('swaPrice', log)

    return p
  }

  get sheathPrice(): string {
    const { sheath } = this.cable
    if (!sheath) {
      return '0'
    }

    const { material, sheathWeight } = this.priceConfig

    const log: string[] = []

    const weight = sheathWeight[this.type] || 0
    log.push(`${sheath}单位重量 = ${weight}`)

    const p = this.toFixed(weight * material[sheath])
    log.push(`总价(${p}) = ↸(${weight}) * ${sheath}单价(${material[sheath]})`)

    this.setLog('sheathPrice', log)

    return p
  }

  get price(): CalculationFields<string> {
    const {
      corePrice,
      micaPrice,
      insulationPrice,
      waterBlockingTapePrice,
      braidedPrice,
      iscrPrice,
      iDrainWirePrice,
      oscrPrice,
      drainWirePrice,
      innerSheathPrice,
      swaPrice,
      sheathPrice,
    } = this
    return {
      corePrice,
      micaPrice,
      insulationPrice,
      waterBlockingTapePrice,
      braidedPrice,
      iscrPrice,
      iDrainWirePrice,
      oscrPrice,
      drainWirePrice,
      innerSheathPrice,
      swaPrice,
      sheathPrice,
    }
  }

  get total(): string {
    return this.toFixed(
      Object.values(this.price).reduce(
        (accumulator, currentValue) => accumulator + +currentValue,
        0
      )
    )
  }

  get RMBUp(): string {
    return this.segmentedPrice(+this.total)
  }

  get totalUSD(): string {
    const { exchangeRate } = this.priceConfig
    return this.toFixed(exchangeRate.USD * +this.total)
  }

  get USDUp(): string {
    return this.segmentedPrice(+this.totalUSD)
  }
}

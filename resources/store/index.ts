import { CableStore } from './cables'
import { autorun, makeAutoObservable } from 'mobx'
import { ModelStore } from './models'
import { PriceConfig } from './price-config'

export class RootStore {
  readonly cableStore
  readonly modelStore = new ModelStore(this)
  materialDrawerVisible = false
  priceConfig?: PriceConfig = undefined

  constructor() {
    this.loadPriceConfig()
    this.cableStore = new CableStore(this)
    makeAutoObservable(this)
    autorun(() => {
      this.savePriceConfig()
    })
  }

  setMaterialDrawerVisible(visible: boolean) {
    this.materialDrawerVisible = visible
  }

  setPriceConfig(priceConfig: PriceConfig) {
    this.priceConfig = priceConfig
  }

  updatePriceConfig<K extends keyof PriceConfig>(c: K, k: string, v: any) {
    ;(this.priceConfig as any)[c][k] = v
  }

  /**
   * 加载默认配置
   */
  resetPriceConfig() {
    const config = require('./price-config.json')
    this.setPriceConfig(config)
  }

  /**
   * 从 localStorage 读取 priceConfig
   */
  loadPriceConfig() {
    const priceConfig = localStorage.getItem('priceConfig')
    if (priceConfig) {
      this.setPriceConfig(JSON.parse(priceConfig))
    } else {
      this.resetPriceConfig()
    }
  }

  /**
   * 保存到 localStorage
   */
  savePriceConfig() {
    localStorage.setItem('priceConfig', JSON.stringify(this.priceConfig))
  }
}

export default new RootStore()

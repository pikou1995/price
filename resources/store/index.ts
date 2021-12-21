import { CableStore } from './cables'
import { makeAutoObservable } from 'mobx'

export class RootStore {
  readonly cableStore

  constructor() {
    this.cableStore = new CableStore(this)
    makeAutoObservable(this)
  }
}

export default new RootStore()

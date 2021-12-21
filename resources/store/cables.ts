import { autorun, makeAutoObservable } from 'mobx'
import { RootStore } from '.'
import { Cable } from './cable'

export class CableStore {
  cables: Cable[] = []
  mode = 'default'
  showUSD = false
  createCableModalVisible = false
  createPartModalVisible = false
  cableId = 0

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this)
    this.loadCables()
    autorun(() => {
      this.saveCables()
    })
  }

  setCreateCableModalVisible(visible: boolean) {
    this.createCableModalVisible = visible
  }

  setCableId(id: number) {
    this.cableId = id
  }

  setCreatePartModalVisible(visible: boolean) {
    this.createPartModalVisible = visible
  }

  setShowUSD(show: boolean) {
    this.showUSD = show
  }

  create(spec: string) {
    const c = new Cable(this.rootStore)
    c.setSpec(spec)
    this.cables.push(c)
  }

  copy(id: number) {
    const cable = this.cables.find((c: Cable) => c.id === id)
    if (cable) {
      this.cables.push(cable.clone())
    }
  }

  delete(id: number) {
    this.cables = this.cables.filter((c: Cable) => c.id !== id)
  }

  loadCables() {
    const cables = localStorage.getItem('cables')
    if (cables) {
      this.cables = JSON.parse(cables).map((cable: Cable) =>
        new Cable(this.rootStore).restore(cable)
      )
    }
  }

  saveCables() {
    const cables = this.cables.map((cable) => {
      const { rootStore, ...c } = cable
      return c
    })
    localStorage.setItem('cables', JSON.stringify(cables))
  }
}

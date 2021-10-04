import { autorun, makeAutoObservable, toJS, when } from 'mobx'
import { RootStore } from '.'
import { Cable } from './cable'

export class CableStore {
  cables: Cable[] = []
  mode = 'default'
  showUSD = false

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this)
    this.loadCables()
    autorun(() => {
      this.saveCables()
    })
  }

  setShowUSD(show: boolean) {
    this.showUSD = show
  }

  create() {
    this.cables.push(new Cable(this.rootStore))
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
      const { report, rootStore, ...c } = cable
      return c
    })
    localStorage.setItem('cables', JSON.stringify(cables))
  }
}

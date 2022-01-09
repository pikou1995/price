import { autorun, flow, makeAutoObservable } from 'mobx'
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
    this.fetchCables()
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

  create = flow(function* (this: CableStore, spec: string) {
    const { id } = yield fetch('/api/cables', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ spec }),
    }).then((res) => res.json())

    const c = new Cable(id)
    c.setSpec(spec)
    this.cables.push(c)
  })

  delete = flow(function* (this: CableStore, id: number) {
    yield fetch(`/api/cables/${id}`, { method: 'DELETE' })
    this.cables = this.cables.filter((c: Cable) => c.id !== id)
  })

  fetchCables = flow(function* (this: CableStore, spec?: string) {
    const cables = yield fetch(`/api/cables${spec ? `?spec=${spec}` : ''}`, {
      headers: {
        Accept: 'application/json',
      },
    }).then((res) => res.json())
    if (cables) {
      this.cables = cables.map((cable: Cable) =>
        new Cable(cable.id).restore(cable)
      )
    }
  })
}

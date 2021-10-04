import { makeAutoObservable } from 'mobx'
import { RootStore } from '.'

export type Model = {
  model: string
  spec: string
  iw: number
  sw?: number
  oscr?: number
}

export class ModelStore {
  models?: Model[] = undefined
  modelsLoading = false

  drawerVisible = false

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this)
  }

  setModels(models: Model[]) {
    this.models = models
  }

  async resetModels() {
    try {
      this.modelsLoading = true
      const { data } = await import('./models.json')
      this.setModels(data)
    } finally {
      this.modelsLoading = false
    }
  }

  setDrawerVisible(visible: boolean) {
    this.drawerVisible = visible
  }
}

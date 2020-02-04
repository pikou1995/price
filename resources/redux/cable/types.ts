export type Sheath = 'WDZ' | 'PVC' | 'EPDM' | 'AB隔氧层料'
export type CoreType = 'CU' | 'TC'
export type Insulation = 'XLPE' | 'PVC' | 'PE' | 'WDZ'
export type Material = Sheath | CoreType | Insulation | 'STEEL' | 'AL' | 'mica'
export type SWA = '0.9' | '1.25' | '1.6' | '2'

export type Cable = {
  id: number
  coreType: CoreType
  /** 绝缘材料 */
  insulation?: Insulation
  iscr?: boolean
  oscr?: boolean
  iDrainWire?: string
  drainWire?: string
  /** 钢丝铠装直径 */
  diameter?: string
  sheath?: Sheath
  pair?: false
  coreNum?: number
  /** 云母带 */
  mica: 0 | 1 | 2
  /** 钢丝铠装 */
  swa: 0 | 0.9 | 1.25 | 1.6 | 2
  coreArea?: number
  /** 内护套 */
  innerSheath: 0 | Sheath
}

export const defaultCable: Cable = {
  id: 1,
  coreType: 'CU',
  mica: 0,
  swa: 0,
  innerSheath: 0,
}

export type CableState = {
  cables: Array<Cable>
}

export const ADD_CABLE = 'ADD_CABLE'
export const UPDATE_CABLE = 'UPDATE_CABLE'
export const COPY_CABLE = 'COPY_CABLE'
export const DELETE_CABLE = 'DELETE_CABLE'
export const SET_CABLES = 'SET_CABLES'

interface AddCableAction {
  type: typeof ADD_CABLE
}

interface UpdateCableAction {
  type: typeof UPDATE_CABLE
  cable: Cable
}

interface CopyCableAction {
  type: typeof COPY_CABLE
  id: Cable['id']
}

interface DeleteCableAction {
  type: typeof DELETE_CABLE
  id: Cable['id']
}

interface SetCablesAction {
  type: typeof SET_CABLES
  cables: Array<Cable>
}

export type CableActionTypes =
  | AddCableAction
  | UpdateCableAction
  | CopyCableAction
  | DeleteCableAction
  | SetCablesAction

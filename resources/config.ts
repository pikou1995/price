import { CoreType, Material, SWA as SWA_TYPE } from './redux/cable/types'

export const CORE_TYPE: { [index in CoreType]: string } = {
  CU: '铜',
  TC: '镀锡铜',
  // OTHER: '其他',
}

// 单位 g/cm³
export const DENSITY: { [index in CoreType]: number } = {
  CU: 8.9,
  TC: 8.9,
  // OTHER: 1,
}

// 钢丝直径
export const SWA: SWA_TYPE[] = ['0.9', '1.25', '1.6', '2']

// 绞距浪费
export const SWA_WASTE = 0.85

// 绝缘材料
export const INSULATION = ['XLPE', 'PVC', 'PE', 'WDZ', 'BS7655']

// 外护套材料
export const SHEATH = ['WDZ', 'PVC', 'EPDM', 'AB隔氧层料', 'BS7655']

export const trans: { [index in Material]: string } = {
  CU: '纯铜',
  TC: '镀锡铜',
  STEEL: '钢丝',
  AL: '铝箔屏蔽',
  mica: '云母带',
  EPDM: 'EPDM乙丙橡胶',
  XLPE: 'XLPE',
  BS7655: 'BS7655',
  PVC: 'PVC',
  PE: 'PE',
  WDZ: 'WDZ',
  AB隔氧层料: 'AB隔氧层料',
  waterBlockingTape: '阻水带',
}

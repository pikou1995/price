import { State } from './redux'

export default {
  CORE_TYPE: {
    CU: '铜',
    TC: '镀锡铜',
    // OTHER: '其他'
  },
  CORE_NUM: new Array(20).fill(null).map((_, i) => i + 1),
  AREA: [
    '0.75',
    '1.0',
    '1.5',
    '2.5',
    '4',
    '6',
    '10',
    '16',
    '25',
    '35',
    '50',
    '70',
    '95',
    '120',
    '150',
    '185',
    '240',
  ],
  // 单位 g/cm³
  DENSITY: {
    CU: 8.9,
    TC: 8.9,
    OTHER: 1,
  },
  SWA: ['0.9', '1.25', '1.6', '2'],
  SWA_WASTE: 0.85,
  INSULATION: ['XLPE', 'PVC', 'PE', 'WDZ'],
  SHEATH: ['WDZ', 'PVC', 'EPDM', 'AB隔氧层料'],
}

export const trans = {
  CU: '纯铜',
  TC: '镀锡铜',
  STEEL: '钢丝',
  AL: '铝箔屏蔽',
  mica: '云母带',
  EPDM: 'EPDM乙丙橡胶',
}

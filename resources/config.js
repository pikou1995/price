export default {
  CORE_TYPE: {
    CU: '铜',
    // OTHER: '其他'
  },
  CORE_NUM: new Array(20).fill(null).map((_, i) => i + 1),
  AREA: [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240],
  // 单位 g/cm³
  DENSITY: {
    CU: 8.9,
    OTHER: 1,
  },
  SWA: [0.9, 1.25, 1.6, 2],
  SWA_WASTE: 0.85,
  INSULATION: ['XLPE', 'PVC', '橡胶', 'PE'],
  SHEATH: ['WDZ', 'PVC'],
}

export const defaultState = {
  id: 1,
  cables: [],
  priceConfig: {
    core: {},
    mica: 0.2,
    insulation: {},
    insulationWeight: {},
    sheath: {},
    sheathWeight: {},
    exchangeRage: {},
    swaWeight: {},
  },
  priceConfigLoaded: false,
  orderLoaded: false,
  orders: [],
}

export const defaultCable = {
  coreType: 'CU',
  mica: '0',
  swa: '0',
}

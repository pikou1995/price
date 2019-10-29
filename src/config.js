export default {
  CORE_TYPE: {
    CU: '铜',
    // OTHER: '其他'
  },
  CORE_NUM: new Array(20).fill(null).map((v, i) => i + 1),
  AREA: [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240],
  // 单位 g/cm³
  DENSITY: {
    CU: 8.9,
    OTHER: 1,
  },
  INSULATION: ['XLPE', 'PVC', '橡胶', 'PE'],
  SHEATH: ['WDZ', 'PVC'],
}

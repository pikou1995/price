/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  return {
    keys: 'wXFPC_10amLmz0SSCBf0_08sHonOsFrf',
    security: {
      csrf: {
        enable: false,
      },
    },
    redis: {
      client: {
        port: 6379, // Redis port
        host: '127.0.0.1', // Redis host
        password: '',
        db: 0,
      },
    },
    multipart: {
      mode: 'file',
      fileExtensions: ['.xls', '.xlsx'],
    },
    defaultPriceConfig: {
      material: {
        CU: 0.05,
        TC: 0.052,
        STEEL: 0.006,
        AL: 0.027,
        mica: 0.2,
        XLPE: 0.014,
        PVC: 0.007,
        PE: 0.014,
        WDZ: 0.012,
        EPDM: 0.03,
        AB隔氧层料: 0.0104
      },
      insulationWeight: {},
      iscrWeight: {},
      oscrWeight: {},
      sheathWeight: {},
      innerSheathWeight: {},
      exchangeRage: {
        USD: 0.14,
      },
      swaWeight: {
        '0.9': 5,
        '1.25': 10,
        '1.6': 15,
        '2': 25,
      },
    },
  }
}

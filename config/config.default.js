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
      core: {
        CU: 52000,
        TC: 50000,
        STEEL: 6000,
      },
      mica: 0.2,
      material: {
        XLPE: 0.014,
        WDZ: 0.012,
      },
      insulationWeight: {},
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

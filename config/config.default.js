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
    defaultPriceConfig: {
      core: { CU: 52000 },
      mica: 0.2,
      insulation: {
        XLPE: 0.014,
      },
      insulationWeight: {},
      sheath: {
        WDZ: 0.012,
      },
      sheathWeight: {},
      exchangeRage: {
        USD: 0.14,
      },
    }
  }
}

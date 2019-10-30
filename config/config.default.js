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
  }
}

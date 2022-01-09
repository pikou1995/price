/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  return {
    keys: 'wXFPC_10amLmz0SSCBf0_08sHonOsFrf',
    security: {
      csrf: {
        enable: false,
      },
    },
    middleware: ['auth'],
    session: {
      key: 'PRICE_SESS',
      maxAge: 30 * 24 * 3600 * 1000, // 30 天
      httpOnly: true,
      encrypt: true,
    },
    mysql: {
      // database configuration
      client: {
        // host
        host: process.env.DB_HOST || '127.0.0.1',
        // port
        port: process.env.DB_PORT || '3306',
        // username
        user: process.env.DB_USER || 'root',
        // password
        password: process.env.DB_PASSWORD || '',
        // database
        database: 'price',
      },
      // load into app, default is open
      app: true,
      // load into agent, default is close
      agent: false,
    },
  }
}

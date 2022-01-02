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
    redis: {
      client: {
        port: 6379, // Redis port
        host: '127.0.0.1', // Redis host
        password: '',
        db: 0,
      },
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
    // multipart: {
    //   mode: 'file',
    //   fileExtensions: ['.xls', '.xlsx'],
    // },
  }
}

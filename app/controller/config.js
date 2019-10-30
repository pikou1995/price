const Controller = require('egg').Controller

const DEFAULT_CONFIG = {
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

class ConfigController extends Controller {
  async show() {
    const { ctx, app } = this
    ctx.body = (await app.redis.get('priceConfig')) || DEFAULT_CONFIG
  }

  async save() {
    const { ctx, app } = this
    const priceConfig = JSON.parse((await app.redis.get('priceConfig')) || '{}')
    const body = ctx.request.body
    for (let k in body) {
      switch (Object.prototype.toString.call(body[k])) {
        case '[object Object]':
          priceConfig[k] = { ...priceConfig[k], ...body[k] }
          break
        default:
          priceConfig[k] = body[k]
      }
    }
    await app.redis.set('priceConfig', JSON.stringify(ctx.request.body))
    ctx.body = 'OK'
  }
}

module.exports = ConfigController

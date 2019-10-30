const Controller = require('egg').Controller

class ConfigController extends Controller {
  async show() {
    const { ctx, app, config } = this
    ctx.body = (await app.redis.get('priceConfig')) || config.defaultPriceConfig
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

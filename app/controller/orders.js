const Controller = require('egg').Controller

class OrdersController extends Controller {
  async index() {
    const { ctx, app } = this
    const keys = await app.redis.keys('orderTime-*')
    const times = keys.length ? await app.redis.mget(...keys) : []
    ctx.body = keys.map((k, i) => ({ id: k.substring(10), time: times[i] }))
  }

  async show() {
    const { ctx, app } = this
    const order = await app.redis.get('order-' + ctx.params.id)
    if (order) {
      ctx.body = order
      return
    }
    ctx.throw(404)
  }

  async create() {
    const { ctx, app } = this
    const createRule = {
      time: { type: 'string' },
    }
    ctx.validate(createRule)
    const { time, ...order } = ctx.request.body
    const id = await app.redis.incr('orderId')
    await app.redis
      .pipeline()
      .set('order-' + id, JSON.stringify(order))
      .set('orderTime-' + id, time)
      .exec()
    ctx.body = { id }
  }

  async update() {
    const { ctx, app } = this
    await app.redis.set(
      'order-' + ctx.params.id,
      JSON.stringify(ctx.request.body)
    )
    ctx.status = 204
  }

  async destroy() {
    const { ctx, app } = this
    await app.redis
      .pipeline()
      .del('order-' + ctx.params.id)
      .del('orderTime-' + ctx.params.id)
      .exec()
    ctx.status = 204
  }
}

module.exports = OrdersController

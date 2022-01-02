const Controller = require('egg').Controller

class CablesController extends Controller {
  async index() {
    const { ctx, app } = this
    const cables = await app.mysql.select('cables')
    const parts = await app.mysql.select('parts', {
      orders: [['cid', 'asc']],
    })
    for (const cable of cables) {
      cable.parts = []
      let pLen = parts.length
      while (pLen && cable.id === parts[0].cid) {
        cable.parts.push(parts.shift())
        pLen--
      }
    }
    ctx.body = cables
  }

  async show() {
    const { ctx, app } = this
    const order = await app.mysql.get('cables', { id: ctx.params.id })
    if (!order) {
      ctx.throw(404)
    }
    ctx.body = order
  }

  async create() {
    const { ctx, app } = this
    const createRule = {
      spec: 'string',
    }
    ctx.validate(createRule)
    const { spec } = ctx.request.body
    const { insertId } = await app.mysql.insert('cables', {
      spec,
      createdAt: app.mysql.literals.now,
    })
    ctx.body = {
      id: insertId,
    }
  }

  async update() {
    const { ctx, app } = this
    await app.mysql.update('cables', {
      id: ctx.params.id,
      ...ctx.request.body,
    })
    ctx.status = 204
  }

  async destroy() {
    const { ctx, app } = this
    await app.mysql.delete('cables', { id: ctx.params.id })
    ctx.status = 204
  }
}

module.exports = CablesController

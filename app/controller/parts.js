const Controller = require('egg').Controller

class PartsController extends Controller {
  async index() {
    const { ctx, app } = this
    const cables = await app.mysql.select('parts', {
      orders: [['id', 'desc']],
    })
    ctx.body = cables
  }

  async show() {
    const { ctx, app } = this
    const order = await app.mysql.get('parts', { id: ctx.params.id })
    if (!order) {
      ctx.throw(404)
    }
    ctx.body = order
  }

  async create() {
    const { ctx, app } = this
    const createRule = {
      cid: 'int',
      label: 'string',
      formula: 'string',
      // 自动计算的值，仅供参考
      computedValue: 'string',
      // 手动修正的值
      inputValue: 'string?',
    }
    ctx.validate(createRule)
    const {
      cid,
      label,
      formula,
      computedValue,
      inputValue = '',
    } = ctx.request.body
    const { insertId } = await app.mysql.insert('parts', {
      cid,
      label,
      formula,
      computedValue,
      inputValue: inputValue,
    })
    ctx.body = {
      id: insertId,
    }
  }

  async update() {
    const { ctx, app } = this
    await app.mysql.update('parts', {
      id: ctx.params.id,
      ...ctx.request.body,
    })
    ctx.status = 204
  }

  async destroy() {
    const { ctx, app } = this
    await app.mysql.delete('parts', { id: ctx.params.id })
    ctx.status = 204
  }
}

module.exports = PartsController

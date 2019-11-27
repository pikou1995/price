const Controller = require('egg').Controller

class LogController extends Controller {
  async index() {
    const { ctx, app } = this
    const { page = 1, pageSize = 10 } = ctx.queries
    const offset = pageSize * (page - 1)

    const logs = await app.redis.lrange(
      'accessLogs',
      offset,
      offset + pageSize - 1
    )

    ctx.body = {
      logs: logs.map(log => JSON.parse(log)),
      page,
      pageSize,
      total: await app.redis.llen('accessLogs'),
    }
  }

  async create() {
    const { ctx, app } = this
    const createRule = {
      time: {
        type: 'int',
        required: true,
        allowEmpty: false,
      },
      path: {
        type: 'string',
        required: true,
        allowEmpty: false,
      },
      userAgent: {
        type: 'string',
        required: true,
        allowEmpty: false,
      },
    }
    ctx.validate(createRule)

    await app.redis.lpush('accessLogs', JSON.stringify(ctx.request.body))

    ctx.body = 'OK'
  }
}

module.exports = LogController

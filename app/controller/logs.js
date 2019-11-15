const Controller = require('egg').Controller

class LogController extends Controller {
  async index() {
    const { ctx, app } = this
    const { page = 1, pageSize = 10 } = ctx.queries
    ctx.body = {
      logs: await app.redis.lrange(
        'accessLogs',
        pageSize * (page - 1),
        pageSize * page - 1
      ),
      total: await app.redis.llen('accessLogs'),
    }
  }

  async create() {
    const { ctx, app } = this
    const createRule = {
      log: {
        type: 'string',
        required: true,
        allowEmpty: false,
      },
    }
    ctx.validate(createRule)

    await app.redis.lpush('accessLogs', ctx.request.body.log)

    ctx.body = 'OK'
  }
}

module.exports = LogController

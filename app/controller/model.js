const Controller = require('egg').Controller
const xlsx = require('node-xlsx')
const fs = require('fs')

class ModelController extends Controller {
  async index() {
    const { ctx, app } = this
    const models = await app.redis.get('models')
    ctx.body = models || []
  }

  async parse() {
    const { ctx, app, service } = this
    const file = ctx.request.files[0]
    const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(file.filepath))
    try {
      const models = service.model.getModels(workSheetsFromBuffer)
      app.redis.set('models', JSON.stringify(models))
      ctx.body = 'OK'
    } catch (e) {
      ctx.logger.error(e)
      ctx.throw('文件错误')
    }
  }
}

module.exports = ModelController

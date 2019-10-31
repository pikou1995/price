const Controller = require('egg').Controller
const xlsx = require('node-xlsx')
const fs = require('fs')

class FileController extends Controller {
  async parse() {
    const { ctx, app } = this
    const file = ctx.request.files[0]
    const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(file.filepath))

    ctx.body = workSheetsFromBuffer
  }
}

module.exports = FileController

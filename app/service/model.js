const Service = require('egg').Service

const fields = [/^型号$/, /^规格$/, /^绝缘重量{0,1}$/, /^护套重量$/, /^屏蔽重量$/]
const keys = ['model', 'spec', 'iw', 'sw', 'oscr']

class ExcelService extends Service {
  /**
   * 获取所有型号名
   * @param {array} sheets
   */
  getModelNames(sheets) {
    return [
      ...sheets.reduce((acc, sheet) => {
        sheet.data.forEach(item => item[0] && acc.add(item[0]))
        return acc
      }, new Set()),
    ].filter(this._isLikeModel)
  }

  /**
   * 猜测是不是型号名
   * @param {string} model
   */
  _isLikeModel(model) {
    return model && /^[A-Za-z]/.test(model)
  }

  /**
   * 把相同型号的集合切出来
   * @param {array} data
   */
  _slice(data) {
    const modelSets = []
    let nextI = 0
    while (nextI !== -1) {
      nextI = data.findIndex((line, i) => i && fields[0].test(line[0]))
      nextI !== -1
        ? modelSets.push(data.splice(0, nextI))
        : modelSets.push(data)
    }
    return modelSets
  }

  /**
   * 洗去杂数据
   * @param {array} data
   */
  _clean(data) {
    return data.filter(
      line => this._isLikeModel(line[0]) || fields[0].test(line[0])
    )
  }

  /**
   * 抽取组装数据
   * @param {array} data
   */
  _read(data) {
    const [head, ...models] = data
    const modelIndexs = fields.map(field => head.findIndex(f => field.test(f)))
    return models.map(m => {
      const model = {}
      modelIndexs.forEach((modelI, keyI) => {
        model[keys[keyI]] = m[modelI]
      })
      return model
    })
  }

  getModels(sheets) {
    return sheets
      .filter(sheet => sheet.data.length)
      .map(sheet => this._slice(this._clean(sheet.data)).map(this._read))
      .reduce((acc, val) => {
        return [...acc, ...val.reduce((a, v) => [...a, ...v], [])]
      }, [])
      .sort((a, b) => {
        if (a.model < b.model) {
          return -1
        }
        if (a.model > b.model) {
          return 1
        }
        return 0
      })
  }
}

module.exports = ExcelService

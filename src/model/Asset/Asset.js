const validator = require('../../util/helpers/validators.js')

class Asset {
  constructor (symbol, name = '', imagemUrl = '') {
    this.symbol = symbol
    this.name = name
    this.imagemUrl = imagemUrl
  }

  static validate (symbol) {
    validator.emptyField({
      symbol: symbol
    })
  }
}

module.exports = Asset

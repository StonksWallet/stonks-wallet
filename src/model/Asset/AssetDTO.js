const validator = require('../../util/helpers/validators.js')

class AssetDTO {
  constructor (symbol, price, changePercent) {
    this.symbol = symbol
    this.price = price
    this.changePercent = changePercent
  }

  static validate (symbol) {
    validator.emptyField({
      symbol: symbol
    })
  }
}

module.exports = AssetDTO

const Serializer = require('./Serializer.js')

class AssetDTOSerializer extends Serializer {
  constructor (contentType, extraFields = []) {
    super()
    this.contentType = contentType
    this.publicFields = ['symbol', 'price', 'changePercent'].concat(extraFields)
  }
}

module.exports = AssetDTOSerializer

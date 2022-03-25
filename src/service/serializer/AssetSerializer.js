const Serializer = require('./Serializer.js')

class AssetSerializer extends Serializer {
  constructor (contentType, extraFields = []) {
    super()
    this.contentType = contentType
    this.publicFields = ['name', 'symbol'].concat(extraFields)
  }
}

module.exports = AssetSerializer

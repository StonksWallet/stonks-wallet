class AssetNotFound extends Error {
  constructor () {
    super('Asset não encontrado')
    this.name = 'AssetNotFound'
    this.id = 9
  }
}

module.exports = AssetNotFound

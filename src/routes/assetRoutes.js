const assetController = require('../controller/assetController')
const { Auth } = require('../util/middlewares')

module.exports = app => {
  app.route('/asset/add')
    .post(
      Auth.bearer,
      assetController.createAsset)
  app.route('/asset/edit')
    .put(
      Auth.bearer,
      assetController.editAsset)
  app.route('/asset/delete')
    .delete(
      Auth.bearer,
      assetController.deleteAsset)

  app.route('/asset')
    .get(
      Auth.bearer,
      assetController.getAsset)

  app.route('/assets')
    .get(
      Auth.bearer,
      assetController.listAsset)
}

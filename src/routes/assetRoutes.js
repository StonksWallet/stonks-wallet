const assetController = require('../controller/assetController');

module.exports = app => {
    app.route('/asset/add')
        .post(assetController.createAsset);
};
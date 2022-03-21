const Asset = require("../model/Asset/Asset.js");
const AssetRepository = require('../service/Repositories/AssetRepository.js');
const {DuplicatedAssetError} = require("../util/errors");
const {AssetSerializer} = require('../service/Serializer');
function sendResponse(res, status, result, serializer) {
    res.status(status);
    res.send(serializer.serialize(result));
}


module.exports = {
    createAsset: async (req, res, next) => {
        const {name, symbol} = req.body;

        try {
            Asset.validate(name, symbol);

            const asset = new Asset(name, symbol);
            const result = await AssetRepository.save(asset);

            sendResponse(res, 201, result, new AssetSerializer(res.getHeader('Content-Type')));
        } catch (error) {
            next(error);
            if(error.code === 11000) {
                next(new DuplicatedAssetError());
            } else {
                next(error);
            }
        }
    }
};
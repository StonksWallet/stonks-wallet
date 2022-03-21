const Asset = require("../../model/Asset/Asset.js");
const AssetModel = require('../../model/Asset/AssetModel.js');
const {AssetNotFound} = require("../../util/errors");

module.exports = {
    save: async (asset) => {
        const instance = new AssetModel(asset);
        const result = await instance.save();
        return result.toObject();
    },
    findByName: async (name) => {
        const result = await AssetModel.findOne({name: name});
        if(!result)
            throw new AssetNotFound();

        return new Asset(result.name, result.symbol);
    },
    findBySymbol: async (symbol) => {
        const result = await AssetModel.findOne({symbol: symbol});
        if(!result)
            throw new AssetNotFound();

        return new Asset(result.name, result.symbol);
    }
}
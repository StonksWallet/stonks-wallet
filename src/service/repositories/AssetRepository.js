const { Collection } = require("mongoose");
const Asset = require("../../model/Asset/Asset.js");
const AssetModel = require('../../model/Asset/AssetModel.js');
const {AssetNotFound} = require("../../util/errors");

module.exports = {
    save: async (asset) => {
        const instance = new AssetModel(asset);
        const result = await instance.save();
        return result.toObject();
    },
    delete: async(symbol) => {
        const result = await AssetModel.deleteOne({symbol: symbol});
        if(!result)
            throw new AssetNotFound();

        return new Asset(result.symbol);
    },
    findByParams: async (params) => {
        const result = await AssetModel.find(params)
        return new Asset(result.name, result.symbol)
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
    },
    listAllSymbols: async () => {
        const result = await AssetModel.find();
        if(!result)
            throw new AssetNotFound();

        let symbolList = result.map((value) => value.symbol);
        return symbolList;
    },
}
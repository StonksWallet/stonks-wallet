const Asset = require("../model/Asset/Asset.js");
const AssetDTO = require("../model/Asset/AssetDTO.js");
const AssetRepository = require('../service/repositories/AssetRepository.js');
const OrderRepository = require('../service/repositories/OrderRepository.js');
const {DuplicatedAssetError, AssetNotFound} = require("../util/errors");
const {AssetSerializer, AssetDTOSerializer} = require('../service/serializer');

const Axios = require('axios');
function sendResponse(res, status, result, serializer) {
    res.status(status);
    res.send(serializer.serialize(result));
}

const binanceUrl = "https://api.binance.com/api/v3/ticker/24hr?";

async function httpGet(theUrl)
{
    let data = await Axios.get(theUrl);
    return data.data;
}

module.exports = {
    createAsset: async (req, res, next) => {
        const {symbol, name, imageUrl} = req.body;
        try {
            Asset.validate(symbol);

            const asset = new Asset(symbol, name, imageUrl);
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
    },
    editAsset: async (req, res, next) => {
        const {name, symbol, imageUrl} = req.body;
        try {
            const asset = await AssetRepository.findBySymbol(symbol);
            if (!asset)
                new AssetNotFound();
              
            asset.name = name;
            asset.imagemUrl = imageUrl;
            const result = await AssetRepository.save(asset);
            
            sendResponse(res, 200, result, new AssetSerializer(res.getHeader('Content-Type')));
        } catch (error) {
            next(error);
        }
    },
    deleteAsset: async (req, res, next) => {
        const {symbol} = req.body;
        try {
            const asset = await AssetRepository.findBySymbol(symbol);
            if (!asset)
                new AssetNotFound();
            const result = await AssetRepository.delete(asset);

            sendResponse(res, 202, result, new AssetSerializer(res.getHeader('Content-Type')));
        } catch (error) {
            next(error);
        }
    },
    getAsset: async (req, res, next) => {
        const {symbol} = req.query;
        const query = "symbol=" + symbol + "USDT";
        try {
            httpGet(binanceUrl + query).then((result) => {
                const assetDTO = new AssetDTO(symbol, result.lastPrice, result.priceChangePercent);
                sendResponse(res, 200, assetDTO, new AssetDTOSerializer(res.getHeader('Content-Type')));
            });
        } catch (error) {
            next(error);
        }
    },
    listAsset: async (req, res, next) => {
        try {            
            let assets = await AssetRepository.listAllAssets();
            let assetsAmount = {}
            assets.forEach((asset) => {
                assetsAmount[asset.symbol] = asset.cap
            })

            assets = assets.map((asset) => `"${asset.symbol}USDT"`);

            const query = "symbols=[" + assets.join(',') + "]";
            try{
                let result = await Axios.get(binanceUrl + query);
                result = result.data;

                let assetList = [];
                for (let asset of result){
                    let symbol = asset.symbol;
                    symbol = symbol.substring(0,asset.symbol.length-4);

                    assetList.push(new AssetDTO(symbol, asset.lastPrice, asset.priceChangePercent, assetsAmount[symbol] * asset.lastPrice));
                }
                sendResponse(res, 200, assetList, new AssetDTOSerializer(res.getHeader('Content-Type'), ['marketCap']));
            } catch(error){
                console.log(error.message);
            }            
        } catch (error) {
            next(error);
        }
    },    
    listMyAssets: async (req, res, next) => {
        const user_email = req.user.email;

        let assets = await AssetRepository.listAllAssets();
        let assetsAmount = {}
        assets.forEach((asset) => {
            assetsAmount[asset.symbol] = asset.cap
        })

        assets = assets.map((asset) => `"${asset.symbol}USDT"`);

        const query = "symbols=[" + assets.join(',') + "]";

        try {            
            let orders = await OrderRepository.findByParams({ user_email })
            let symbols = orders.map((order) => order.name)
            symbols = [...new Set(symbols)]

            let result = await Axios.get(binanceUrl + query);
            result = result.data;

            let assetsList = [];
            for (let asset of result){
                let symbol = asset.symbol;
                symbol = symbol.substring(0,asset.symbol.length-4);

                assetsList.push(new AssetDTO(symbol, asset.lastPrice, asset.priceChangePercent, assetsAmount[symbol] * asset.lastPrice));
            }
            assetsList = assetsList.filter((asset) => symbols.includes(asset.symbol) )

            sendResponse(res, 200, assetsList, new AssetDTOSerializer(res.getHeader('Content-Type'), ['marketCap']));
        } catch (error) {
            next(error);
        }
    },    
};

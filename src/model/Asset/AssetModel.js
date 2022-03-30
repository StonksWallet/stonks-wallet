const {Schema, model} = require('mongoose');

const AssetModel = new Schema({
        symbol: {
            type: String,
            unique: true,
            required: true,
        },
        name: {
            type: String,
        },
        imagemUrl: {
            type: String
        },
        cap: {
            type: Number
        }
    });

module.exports = model('Asset', AssetModel);
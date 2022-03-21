const {Schema, model} = require('mongoose');

const AssetModel = new Schema({
        name: {
            type: String,
            required: true,
        },
        symbol: {
            type: String,
            unique: true,
            required: true,
        }
    });

module.exports = model('Asset', AssetModel);
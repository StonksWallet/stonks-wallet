const validator = require("../../util/helpers/validators.js");

class AssetDTO{
    constructor(symbol, price, changePercent, marketCap = -1) {
        this.symbol = symbol;
        this.price = price;
        this.changePercent = changePercent;
        this.marketCap = marketCap;
    }

    static validate(symbol) {
        validator.emptyField({
            symbol: symbol
        });
    }
}

module.exports = AssetDTO;
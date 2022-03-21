const validator = require("../../util/helpers/validators.js");

class Asset{
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
    }

    static validate(name, symbol) {
        validator.emptyField({
            name: name,
            symbol: symbol
        });
    }
}

module.exports = Asset;
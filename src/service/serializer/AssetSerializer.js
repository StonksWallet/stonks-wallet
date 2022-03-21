const Serializer = require("./Serializer.js");

class CryptoCurrencySerializer extends Serializer {
    constructor(contentType, extraFields = []) {
        super();
        this.contentType = contentType;
        this.publicFields = ['name', 'symbol'].concat(extraFields);
    }
}

module.exports = CryptoCurrencySerializer;

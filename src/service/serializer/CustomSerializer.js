const Serializer = require("./Serializer.js");

class CustomSerializer extends Serializer {
    constructor(contentType, fields) {
        super();
        this.contentType = contentType;
        this.publicFields = fields;
    }
}

module.exports = CustomSerializer;

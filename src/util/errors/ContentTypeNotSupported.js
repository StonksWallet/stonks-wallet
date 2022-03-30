class ContentTypeNotSupported extends Error {
    constructor(contentType) {
        super(`Formato ${contentType} não suportado`);
        this.name = "ContentTypeError";
        this.id = 1;
    }
}

module.exports = ContentTypeNotSupported;
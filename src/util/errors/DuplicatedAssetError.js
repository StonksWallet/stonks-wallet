class DuplicatedAssetError extends Error {
    constructor() {
        super("Já existe esse asset");
        this.name = "DuplicatedAssetError";
        this.id = 10;
    }
}

module.exports = DuplicatedAssetError;

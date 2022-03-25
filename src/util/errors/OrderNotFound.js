class OrderNotFound extends Error {
    constructor() {
        super("Ordem nao encontrada");
        this.name = "OrderNotFound";
        this.id = 11;
    }
}

module.exports = OrderNotFound;
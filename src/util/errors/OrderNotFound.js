class OrderNotFound extends Error {
    constructor() {
        super("Ordem nao encontrada");
        this.name = "OrderNotFound";
        this.id = 3;
    }
}

module.exports = OrderNotFound;
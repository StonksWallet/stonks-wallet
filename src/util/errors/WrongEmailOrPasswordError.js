class WrongEmailOrPasswordError extends Error {
    constructor() {
        super("Email ou senha inválidos");
        this.name = "WrongEmailOrPasswordError";
        this.id = 4;
    }
}

module.exports = WrongEmailOrPasswordError;
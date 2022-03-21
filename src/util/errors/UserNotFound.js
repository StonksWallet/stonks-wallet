class UserNotFound extends Error {
    constructor() {
        super("Usuário não encontrado");
        this.name = "UserNotFound";
        this.id = 3;
    }
}

module.exports = UserNotFound;
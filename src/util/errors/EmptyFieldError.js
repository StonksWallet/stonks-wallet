class EmptyFieldError extends Error {
  constructor (field) {
    super(`O campo ${field} é obrigatório`)
    this.name = 'EmptyFieldError'
    this.id = 5
  }
}

module.exports = EmptyFieldError

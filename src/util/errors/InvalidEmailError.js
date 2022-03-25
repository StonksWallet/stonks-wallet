class InvalidEmailError extends Error {
  constructor () {
    super('Formato do email inválido')
    this.name = 'InvalidEmailError'
    this.id = 7
  }
}

module.exports = InvalidEmailError

export class ProductNotFoundError extends Error {
  constructor () {
    super('Producto no encontrado')
    this.code = 404
    this.stack = null
  }
}

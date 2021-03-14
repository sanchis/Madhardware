const fakeUAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1'
export const ConfigAxios = {
  headers: {
    'User-Agent': fakeUAgent
  }
}

export function ProductNotFound () {
  throw new Error('Producto no encontrado')
};
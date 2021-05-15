const fakeUAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
export const ConfigAxios = ({ ...extraConfig }) => {
  const config = extraConfig || {}
  config.headers = {
    ...config.headers,
    'User-Agent': fakeUAgent
  }
  return config
}

export function ProductNotFound () {
  throw new Error('Producto no encontrado')
};
